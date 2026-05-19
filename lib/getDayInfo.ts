import type {
  DayInfo,
  DreamspellInfo,
  SolInfo,
  WeekdayInfo,
  Zodiac,
} from '../types/calendar';
import { WEEKDAYS } from '../data/weekdays';
import { MOONS } from '../data/moons';
import { ZODIACS } from '../data/zodiacs';
import { SOL_MONTHS } from '../data/sol-months';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Day-of-year (1-based) for a given local date.
 * Jan 1 = 1, Dec 31 = 365 or 366.
 */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diffMs = date.getTime() - start.getTime();
  return Math.floor(diffMs / 86_400_000) + 1;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Normalize to local midnight to avoid DST / time-of-day drift. */
function toLocalMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// ─────────────────────────────────────────────────────────────────────────────
// Weekday → celestial body + chakra
// ─────────────────────────────────────────────────────────────────────────────

export function getWeekdayInfo(date: Date): WeekdayInfo {
  return WEEKDAYS[date.getDay()];
}

// ─────────────────────────────────────────────────────────────────────────────
// Zodiac (astronomical, IAU 1930, with Ophiuchus)
// ─────────────────────────────────────────────────────────────────────────────

export function getZodiac(date: Date): Zodiac {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();         // 1-31

  for (const z of ZODIACS) {
    // Special case: Sagittarius wraps across year boundary (17 Dec → 20 Jan)
    if (z.name === 'Sagittarius') {
      const afterStart =
        month > z.start.month ||
        (month === z.start.month && day >= z.start.day);
      const beforeEnd =
        month < z.end.month ||
        (month === z.end.month && day < z.end.day);
      if (afterStart || beforeEnd) return z;
      continue;
    }

    // Normal case: start <= date < end
    const afterStart =
      month > z.start.month ||
      (month === z.start.month && day >= z.start.day);
    const beforeEnd =
      month < z.end.month ||
      (month === z.end.month && day < z.end.day);
    if (afterStart && beforeEnd) return z;
  }

  // Should be unreachable
  throw new Error(`No zodiac found for ${date.toISOString()}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Dreamspell (13 Moon) — starts 26 July, Day Out of Time = 25 July
// ─────────────────────────────────────────────────────────────────────────────

export function getDreamspellInfo(date: Date): DreamspellInfo {
  const d = toLocalMidnight(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  // Day Out of Time = 25 July
  if (month === 7 && day === 25) {
    return {
      isDayOutOfTime: true,
      moon: null,
      dayInMoon: null,
      weekInMoon: null,
      dayInYear: null,
    };
  }

  // Determine which Dreamspell year we're in.
  // If we're on or after 26 July → year starts this calendar year.
  // If before 26 July → year starts previous calendar year.
  const onOrAfterJul26 = month > 7 || (month === 7 && day >= 26);
  const yearStart = new Date(
    onOrAfterJul26 ? year : year - 1,
    6, // July (0-indexed)
    26,
  );

  const diffDays = Math.floor(
    (d.getTime() - yearStart.getTime()) / 86_400_000,
  );

  // diffDays is 0-based: 0 = Magnetic Moon day 1
  // 0-27 = Moon 1, 28-55 = Moon 2, ... 336-363 = Moon 13
  const moonIndex = Math.floor(diffDays / 28); // 0-12
  const dayInMoon = (diffDays % 28) + 1;       // 1-28
  const weekInMoon = Math.ceil(dayInMoon / 7) as 1 | 2 | 3 | 4;

  return {
    isDayOutOfTime: false,
    moon: MOONS[moonIndex],
    dayInMoon,
    weekInMoon,
    dayInYear: diffDays + 1,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// International Fixed Calendar (Sol) — starts 1 January
// ─────────────────────────────────────────────────────────────────────────────

export function getSolInfo(date: Date): SolInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const leap = isLeapYear(year);

  // Year Day = 31 December (last day of year, no weekday in IFC)
  if (month === 12 && day === 31) {
    return {
      isYearDay: true,
      isLeapDay: false,
      month: null,
      dayInMonth: null,
    };
  }

  // Leap Day = 17 June (only in leap years; sits between June 28 and Sol 1)
  // In IFC, June has 28 days (Jun 1 - Jun 28 maps to Jan 1 - Jan 28 of IFC,
  // shifted). The Gregorian date "June 17" in a leap year is the Leap Day.
  if (leap && month === 6 && day === 17) {
    return {
      isYearDay: false,
      isLeapDay: true,
      month: null,
      dayInMonth: null,
    };
  }

  // Otherwise, compute day-of-year, adjust for leap day, then divide by 28.
  let doy = dayOfYear(date); // 1-based

  if (leap) {
    // In a leap year, we want to "skip" June 17 in our IFC counting so that
    // June 18 (Gregorian) still maps to IFC day 169 (Sol 1), not 170.
    const leapDayDoy = dayOfYear(new Date(year, 5, 17)); // June 17
    if (doy > leapDayDoy) doy -= 1;
  }

  // Now doy is 1..364. Months are 28 days each, 13 of them.
  const monthIndex = Math.floor((doy - 1) / 28); // 0-12
  const dayInMonth = ((doy - 1) % 28) + 1;        // 1-28

  return {
    isYearDay: false,
    isLeapDay: false,
    month: SOL_MONTHS[monthIndex],
    dayInMonth,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined entry point — what the widget consumes
// ─────────────────────────────────────────────────────────────────────────────

export function getDayInfo(date: Date = new Date()): DayInfo {
  const d = toLocalMidnight(date);
  return {
    gregorianDate: d,
    weekday: getWeekdayInfo(d),
    zodiac: getZodiac(d),
    dreamspell: getDreamspellInfo(d),
    sol: getSolInfo(d),
  };
}

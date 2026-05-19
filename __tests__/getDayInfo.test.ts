/**
 * Tests for getDayInfo
 * Verifies the math against the reference calendar image (2025-2026)
 * and known astronomical zodiac boundaries.
 */
import {
  getDayInfo,
  getDreamspellInfo,
  getSolInfo,
  getZodiac,
  getWeekdayInfo,
} from '../lib/getDayInfo';

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    const msg = detail ? `${label} — ${detail}` : label;
    failures.push(msg);
    console.log(`  ✗ ${msg}`);
  }
}

function eq<T>(label: string, actual: T, expected: T) {
  assert(
    label,
    actual === expected,
    `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
  );
}

// ─── Weekday ────────────────────────────────────────────────────────────────
console.log('\nWeekday → celestial body + chakra');
{
  // 17 May 2026 is a Sunday (the example in the mockup)
  const sunday = getWeekdayInfo(new Date(2026, 4, 17));
  eq('Sunday weekday', sunday.weekday, 'Sunday');
  eq('Sunday celestial', sunday.celestialBody, 'Sun');
  eq('Sunday chakra number', sunday.chakra.number, 3);
  eq('Sunday chakra name', sunday.chakra.name, 'Solar Plexus');
  eq('Sunday chakra color', sunday.chakra.color, '#F3B512');

  const friday = getWeekdayInfo(new Date(2026, 4, 15));
  eq('Friday celestial', friday.celestialBody, 'Venus');
  eq('Friday chakra', friday.chakra.name, 'Heart');

  const saturday = getWeekdayInfo(new Date(2026, 4, 16));
  eq('Saturday chakra', saturday.chakra.name, 'Crown');
}

console.log('\nChakra elements — 7-element tantric system');
{
  const sun = getWeekdayInfo(new Date(2026, 4, 17));  // Sunday → Solar Plexus
  eq('Sunday element', sun.chakra.element, 'Fire');

  const mon = getWeekdayInfo(new Date(2026, 4, 18));  // Monday → Sacral
  eq('Monday element', mon.chakra.element, 'Water');

  const tue = getWeekdayInfo(new Date(2026, 4, 19));  // Tuesday → Root
  eq('Tuesday element', tue.chakra.element, 'Earth');

  const wed = getWeekdayInfo(new Date(2026, 4, 20));  // Wednesday → Throat
  eq('Wednesday element', wed.chakra.element, 'Ether');

  const thu = getWeekdayInfo(new Date(2026, 4, 21));  // Thursday → Third Eye
  eq('Thursday element', thu.chakra.element, 'Light');

  const fri = getWeekdayInfo(new Date(2026, 4, 22));  // Friday → Heart
  eq('Friday element', fri.chakra.element, 'Air');

  const sat = getWeekdayInfo(new Date(2026, 4, 23));  // Saturday → Crown
  eq('Saturday element', sat.chakra.element, 'Energy');
}

// ─── Dreamspell against reference calendar image ────────────────────────────
console.log('\nDreamspell — boundaries from reference image');
{
  // 26 July 2025 = Magnetic Moon, day 1
  const start = getDreamspellInfo(new Date(2025, 6, 26));
  eq('26 Jul 2025 → moon', start.moon?.name, 'Magnetic Moon');
  eq('26 Jul 2025 → day', start.dayInMoon, 1);
  eq('26 Jul 2025 → out of time', start.isDayOutOfTime, false);

  // 22 Aug 2025 = Magnetic Moon, day 28 (last day)
  const m1end = getDreamspellInfo(new Date(2025, 7, 22));
  eq('22 Aug 2025 → moon', m1end.moon?.name, 'Magnetic Moon');
  eq('22 Aug 2025 → day', m1end.dayInMoon, 28);

  // 23 Aug 2025 = Lunar Moon, day 1
  const m2start = getDreamspellInfo(new Date(2025, 7, 23));
  eq('23 Aug 2025 → moon', m2start.moon?.name, 'Lunar Moon');
  eq('23 Aug 2025 → day', m2start.dayInMoon, 1);

  // 17 May 2026 should fall in Spectral Moon (2 May – 29 May)
  // 2 May = day 1, so 17 May = day 16
  const may17 = getDreamspellInfo(new Date(2026, 4, 17));
  eq('17 May 2026 → moon', may17.moon?.name, 'Spectral Moon');
  eq('17 May 2026 → day', may17.dayInMoon, 16);
  eq('17 May 2026 → week', may17.weekInMoon, 3);

  // 24 July 2026 = Cosmic Moon, day 28 (last day of the 13-moon year)
  const yearEnd = getDreamspellInfo(new Date(2026, 6, 24));
  eq('24 Jul 2026 → moon', yearEnd.moon?.name, 'Cosmic Moon');
  eq('24 Jul 2026 → day', yearEnd.dayInMoon, 28);

  // 25 July → Day Out of Time
  const dot = getDreamspellInfo(new Date(2026, 6, 25));
  eq('25 Jul 2026 → out of time', dot.isDayOutOfTime, true);
  eq('25 Jul 2026 → moon null', dot.moon, null);

  // 26 July 2026 → start of new year, Magnetic Moon day 1
  const newYear = getDreamspellInfo(new Date(2026, 6, 26));
  eq('26 Jul 2026 → new year moon', newYear.moon?.name, 'Magnetic Moon');
  eq('26 Jul 2026 → new year day', newYear.dayInMoon, 1);

  // Before year start: 1 Jan 2026 falls within prior year cycle
  // 1 Jan 2026 should be Rhythmic Moon (13 Dec - 9 Jan), day 20
  // 13 Dec 2025 = day 1 → 1 Jan 2026 = day 20
  const jan1 = getDreamspellInfo(new Date(2026, 0, 1));
  eq('1 Jan 2026 → moon', jan1.moon?.name, 'Rhythmic Moon');
  eq('1 Jan 2026 → day', jan1.dayInMoon, 20);
}

// ─── Zodiac (astronomical with Ophiuchus) ───────────────────────────────────
console.log('\nZodiac — astronomical boundaries');
{
  eq('20 Jan → Capricorn', getZodiac(new Date(2026, 0, 20)).name, 'Capricorn');
  eq('15 Feb → Capricorn', getZodiac(new Date(2026, 1, 15)).name, 'Capricorn');
  eq('16 Feb → Aquarius', getZodiac(new Date(2026, 1, 16)).name, 'Aquarius');
  eq('11 Mar → Pisces', getZodiac(new Date(2026, 2, 11)).name, 'Pisces');
  eq('17 May → Taurus', getZodiac(new Date(2026, 4, 17)).name, 'Taurus');
  eq('21 Jun → Gemini', getZodiac(new Date(2026, 5, 21)).name, 'Gemini');
  eq('20 Jul → Cancer', getZodiac(new Date(2026, 6, 20)).name, 'Cancer');
  eq('10 Aug → Leo', getZodiac(new Date(2026, 7, 10)).name, 'Leo');
  eq('1 Dec → Ophiuchus', getZodiac(new Date(2026, 11, 1)).name, 'Ophiuchus');
  eq('29 Nov → Ophiuchus', getZodiac(new Date(2026, 10, 29)).name, 'Ophiuchus');
  eq('17 Dec → Sagittarius', getZodiac(new Date(2026, 11, 17)).name, 'Sagittarius');
  eq('1 Jan → Sagittarius', getZodiac(new Date(2026, 0, 1)).name, 'Sagittarius');
  eq('19 Jan → Sagittarius', getZodiac(new Date(2026, 0, 19)).name, 'Sagittarius');
}

// ─── Sol / International Fixed Calendar ─────────────────────────────────────
console.log('\nSol (IFC) — 13 months × 28 days + Year Day + Leap Day');
{
  // 1 Jan = January, day 1
  const jan1 = getSolInfo(new Date(2025, 0, 1));
  eq('1 Jan → month', jan1.month?.name, 'January');
  eq('1 Jan → day', jan1.dayInMonth, 1);

  // 28 Jan = January, day 28 (last day of Jan in IFC)
  const jan28 = getSolInfo(new Date(2025, 0, 28));
  eq('28 Jan → month', jan28.month?.name, 'January');
  eq('28 Jan → day', jan28.dayInMonth, 28);

  // 29 Jan = February, day 1 (in IFC every month is 28 days)
  const jan29 = getSolInfo(new Date(2025, 0, 29));
  eq('29 Jan → month', jan29.month?.name, 'February');
  eq('29 Jan → day', jan29.dayInMonth, 1);

  // Non-leap year (2025): June 17 is just a regular day
  // Day-of-year for June 17 in 2025 = 31+28+31+30+31+17 = 168
  // 168 / 28 = 6 full months, remainder 0 → month index 5 (June), day 28
  // Wait: (168-1)/28 = 5.96, floor = 5 → June (index 5). day = (168-1)%28 + 1 = 28
  const jun17_2025 = getSolInfo(new Date(2025, 5, 17));
  eq('17 Jun 2025 (non-leap) → month', jun17_2025.month?.name, 'June');
  eq('17 Jun 2025 (non-leap) → day', jun17_2025.dayInMonth, 28);
  eq('17 Jun 2025 → not leap day', jun17_2025.isLeapDay, false);

  // 18 Jun 2025 = Sol, day 1
  const jun18 = getSolInfo(new Date(2025, 5, 18));
  eq('18 Jun 2025 → Sol', jun18.month?.name, 'Sol');
  eq('18 Jun 2025 → day', jun18.dayInMonth, 1);

  // 15 Jul 2025 = July (IFC), day 1
  // 18 Jun = Sol day 1, Sol day 28 = 15 Jul... let's verify:
  // Sol day 1 = June 18, Sol day 28 = June 18 + 27 = July 15
  // So July 16 = July (IFC) day 1
  const jul16 = getSolInfo(new Date(2025, 6, 16));
  eq('16 Jul 2025 → IFC July', jul16.month?.name, 'July');
  eq('16 Jul 2025 → day', jul16.dayInMonth, 1);

  // 31 Dec = Year Day
  const yearDay = getSolInfo(new Date(2025, 11, 31));
  eq('31 Dec → year day', yearDay.isYearDay, true);
  eq('31 Dec → month null', yearDay.month, null);

  // Leap year 2024: June 17 = Leap Day
  const leapDay = getSolInfo(new Date(2024, 5, 17));
  eq('17 Jun 2024 → leap day', leapDay.isLeapDay, true);
  eq('17 Jun 2024 → month null', leapDay.month, null);

  // Leap year 2024: June 18 = Sol day 1 (same as non-leap, leap day is "extra")
  const jun18_leap = getSolInfo(new Date(2024, 5, 18));
  eq('18 Jun 2024 → Sol', jun18_leap.month?.name, 'Sol');
  eq('18 Jun 2024 → day', jun18_leap.dayInMonth, 1);

  // Leap year: June 16 = June day 27 (June 17 normally would be 28, but
  // it's the leap day so June 16 is day 27 and... hmm. Actually:
  // In a leap year June 16 = doy 168, leap-day-doy = 169, so 168 < 169
  // means no adjustment. doy=168 → (168-1)/28 = 5.96 → June, day 28.
  // Wait that's wrong. Let me think again.
  //
  // In a non-leap year: Jan 1 → doy 1 = Jan IFC day 1. June 17 → doy 168 = June IFC day 28.
  // In a leap year: same mapping for Jan 1 through June 16. June 17 IS leap day (special).
  //   June 18 should map back to Sol day 1, same as non-leap.
  //   Non-leap June 18 doy = 169 → (169-1)/28 = 6.0 → Sol, day 1. ✓
  //   Leap year June 18 doy = 170, subtract 1 = 169 → Sol day 1. ✓
  //   Leap year June 16 doy = 168, no subtract → June day 28.
  //   But what about June 17 LEAP doy = 169? It's flagged as leap day, returns early. ✓

  const jun16_leap = getSolInfo(new Date(2024, 5, 16));
  eq('16 Jun 2024 → June', jun16_leap.month?.name, 'June');
  eq('16 Jun 2024 → day', jun16_leap.dayInMonth, 28);
}

// ─── Day Out of Time end-to-end ─────────────────────────────────────────────
console.log('\nEnd-to-end getDayInfo on special days');
{
  const dot = getDayInfo(new Date(2026, 6, 25));
  eq('25 Jul → dreamspell out of time', dot.dreamspell.isDayOutOfTime, true);
  // Sol on 25 Jul should be IFC July day 10 (16 Jul = day 1 → 25 Jul = day 10)
  eq('25 Jul → Sol month', dot.sol.month?.name, 'July');
  eq('25 Jul → Sol day', dot.sol.dayInMonth, 10);

  // Year Day = 31 Dec
  const yd = getDayInfo(new Date(2025, 11, 31));
  eq('31 Dec → Sol year day', yd.sol.isYearDay, true);
  // Dreamspell on 31 Dec: 26 Jul + how many days?
  // From 26 Jul 2025 to 31 Dec 2025: Aug(6) + Sep(30) + Oct(31) + Nov(30) + Dec(31) = let me count
  // 26-31 Jul = 6 days, full Aug = 31, Sep = 30, Oct = 31, Nov = 30, Dec 1-31 = 31
  // Total = 6+31+30+31+30+31 = 159 days... so diffDays = 158 (0-based)
  // moonIndex = floor(158/28) = 5 → Rhythmic Moon
  // dayInMoon = 158 % 28 + 1 = 14 + 1 = 15... wait 158%28 = 158-5*28 = 158-140 = 18, +1 = 19
  eq('31 Dec → Dreamspell moon', yd.dreamspell.moon?.name, 'Rhythmic Moon');
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Passed: ${passed}   Failed: ${failed}`);
if (failed > 0) {
  console.log('\nFAILURES:');
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}

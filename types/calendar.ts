/**
 * MAKOYA Calendar — Type definitions
 *
 * Two parallel calendar systems:
 *  - Dreamspell (13 Moon, starts 26 July)
 *  - International Fixed Calendar (Sol, starts 1 January)
 *
 * Shared layers that work across both:
 *  - Weekday → celestial body + chakra
 *  - Gregorian date → zodiac (astronomical, IAU 1930 boundaries, includes Ophiuchus)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Shared layers
// ─────────────────────────────────────────────────────────────────────────────

export type WeekdayName =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type CelestialBody =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn';

export type ChakraNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 7-element system used in MAKOYA — tantric chakra mapping.
 * The first four (Earth/Water/Fire/Air) overlap with classical elements;
 * Ether, Light, and Energy correspond to the transcendent upper chakras.
 */
export type ChakraElement =
  | 'Earth'   // 1st - Root
  | 'Water'   // 2nd - Sacral
  | 'Fire'    // 3rd - Solar Plexus
  | 'Air'     // 4th - Heart
  | 'Ether'   // 5th - Throat
  | 'Light'   // 6th - Third Eye
  | 'Energy'; // 7th - Crown

export interface Chakra {
  number: ChakraNumber;
  name: string;          // "Solar Plexus"
  sanskrit: string;      // "Manipura"
  color: string;         // hex from MAKOYA SVG palette
  location: string;      // body location, for detail view
  element: ChakraElement; // 7-element system
}

export interface WeekdayInfo {
  weekday: WeekdayName;
  dayOfTheX: string;     // "Day of the Sun"
  celestialBody: CelestialBody;
  chakra: Chakra;
}

export type ZodiacName =
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces'
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Ophiuchus'
  | 'Sagittarius';

export interface Zodiac {
  name: ZodiacName;
  symbol: string;        // unicode glyph ♑ ♒ etc.
  // Range used by the lookup. Format: { month: 1-12, day: 1-31 }
  // Inclusive start, exclusive end.
  start: { month: number; day: number };
  end: { month: number; day: number };
}

/**
 * Dreamspell uses 4 classical elements that rotate through the 13 moons.
 * This is distinct from `ChakraElement` (7-element tantric system).
 */
export type MoonElement = 'Fire' | 'Water' | 'Air' | 'Earth';

/** Back-compat alias — prefer MoonElement in new code. */
export type Element = MoonElement;

// ─────────────────────────────────────────────────────────────────────────────
// Dreamspell (13 Moon)
// ─────────────────────────────────────────────────────────────────────────────

export type MoonNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Moon {
  number: MoonNumber;
  name: string;          // "Magnetic Moon"
  theme: string;         // "Attract / Intention"
  element: MoonElement;  // 4-element system (Fire/Water/Air/Earth)
  energy: string;        // "Initiation, passion, self-expression"
  color: string;         // accent color from calendar reference image
}

export interface DreamspellInfo {
  isDayOutOfTime: boolean;     // true on 25 July only
  moon: Moon | null;            // null on Day Out of Time
  dayInMoon: number | null;     // 1-28, null on Day Out of Time
  weekInMoon: 1 | 2 | 3 | 4 | null;
  dayInYear: number | null;     // 1-364, null on Day Out of Time
}

// ─────────────────────────────────────────────────────────────────────────────
// International Fixed Calendar (Sol)
// ─────────────────────────────────────────────────────────────────────────────

export type SolMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'Sol'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface SolMonth {
  number: number;        // 1-13 (Sol = 7)
  name: SolMonthName;
}

export interface SolInfo {
  isYearDay: boolean;          // true on 31 December
  isLeapDay: boolean;          // true on 17 June in leap years
  month: SolMonth | null;       // null on Year Day / Leap Day
  dayInMonth: number | null;    // 1-28, null on special days
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined output — what the widget consumes
// ─────────────────────────────────────────────────────────────────────────────

export interface DayInfo {
  gregorianDate: Date;
  weekday: WeekdayInfo;
  zodiac: Zodiac;
  dreamspell: DreamspellInfo;
  sol: SolInfo;
}

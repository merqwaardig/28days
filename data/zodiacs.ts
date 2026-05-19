import type { Zodiac } from '../types/calendar';

/**
 * Astronomically accurate zodiac boundaries based on IAU (1930) constellation
 * boundaries projected onto the ecliptic. Includes Ophiuchus (the 13th).
 *
 * NOTE: These dates differ from "horoscope" zodiacs because traditional
 * astrology uses tropical signs (12 equal 30° divisions starting at the
 * vernal equinox), while these are the actual constellations the Sun
 * passes through.
 *
 * Range is inclusive of start, exclusive of end. Order matters: lookup
 * iterates in this sequence, with the special wrap from Sagittarius
 * (17 Dec) back to Capricorn (20 Jan) handled in the lookup function.
 */
export const ZODIACS: Zodiac[] = [
  {
    name: 'Capricorn',
    symbol: '♑',
    start: { month: 1, day: 20 },
    end: { month: 2, day: 16 },
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    start: { month: 2, day: 16 },
    end: { month: 3, day: 11 },
  },
  {
    name: 'Pisces',
    symbol: '♓',
    start: { month: 3, day: 11 },
    end: { month: 4, day: 18 },
  },
  {
    name: 'Aries',
    symbol: '♈',
    start: { month: 4, day: 18 },
    end: { month: 5, day: 13 },
  },
  {
    name: 'Taurus',
    symbol: '♉',
    start: { month: 5, day: 13 },
    end: { month: 6, day: 21 },
  },
  {
    name: 'Gemini',
    symbol: '♊',
    start: { month: 6, day: 21 },
    end: { month: 7, day: 20 },
  },
  {
    name: 'Cancer',
    symbol: '♋',
    start: { month: 7, day: 20 },
    end: { month: 8, day: 10 },
  },
  {
    name: 'Leo',
    symbol: '♌',
    start: { month: 8, day: 10 },
    end: { month: 9, day: 16 },
  },
  {
    name: 'Virgo',
    symbol: '♍',
    start: { month: 9, day: 16 },
    end: { month: 10, day: 30 },
  },
  {
    name: 'Libra',
    symbol: '♎',
    start: { month: 10, day: 30 },
    end: { month: 11, day: 23 },
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    start: { month: 11, day: 23 },
    end: { month: 11, day: 29 },
  },
  {
    name: 'Ophiuchus',
    symbol: '⛎',
    start: { month: 11, day: 29 },
    end: { month: 12, day: 17 },
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    start: { month: 12, day: 17 },
    end: { month: 1, day: 20 }, // wraps across year boundary
  },
];

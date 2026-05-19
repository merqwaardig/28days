import type { SolMonth } from '../types/calendar';

/**
 * International Fixed Calendar — Moses B. Cotsworth (1902)
 * Adopted internally by Kodak 1928–1989. Voted on by the League of Nations.
 *
 * 13 months × 28 days = 364, plus:
 *  - "Year Day" on 31 December (no weekday)
 *  - "Leap Day" on 17 June in leap years (no weekday), placed just before Sol
 *
 * Sol is the 7th month, inserted between June and July.
 */
export const SOL_MONTHS: SolMonth[] = [
  { number: 1,  name: 'January' },
  { number: 2,  name: 'February' },
  { number: 3,  name: 'March' },
  { number: 4,  name: 'April' },
  { number: 5,  name: 'May' },
  { number: 6,  name: 'June' },
  { number: 7,  name: 'Sol' },
  { number: 8,  name: 'July' },
  { number: 9,  name: 'August' },
  { number: 10, name: 'September' },
  { number: 11, name: 'October' },
  { number: 12, name: 'November' },
  { number: 13, name: 'December' },
];

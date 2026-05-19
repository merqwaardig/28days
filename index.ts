/**
 * MAKOYA Calendar — public API
 *
 * Usage from anywhere in the app:
 *
 *   import { getDayInfo, getChakraIcon } from '@/calendar';
 *
 *   const info = getDayInfo();              // today
 *   const info = getDayInfo(someDate);      // specific date
 *
 *   const ChakraIcon = getChakraIcon(info.weekday.chakra.number);
 *   <ChakraIcon size={64} />
 */

// Main calculation
export { getDayInfo, getDreamspellInfo, getSolInfo, getZodiac, getWeekdayInfo }
  from './lib/getDayInfo';

// Types (re-exported for component prop typing)
export type {
  DayInfo,
  DreamspellInfo,
  SolInfo,
  WeekdayInfo,
  Zodiac,
  Moon,
  Chakra,
  ChakraNumber,
  CelestialBody,
  Element,
  MoonNumber,
  ZodiacName,
  SolMonth,
  SolMonthName,
  WeekdayName,
} from './types/calendar';

// Static data (rarely imported directly, but available)
export { MOONS } from './data/moons';
export { ZODIACS } from './data/zodiacs';
export { WEEKDAYS, CHAKRAS } from './data/weekdays';
export { SOL_MONTHS } from './data/sol-months';
export { PLANETARY_CONTENT } from './data/planetary-content';

// Chakra icon components
export {
  ChakraRoot,
  ChakraSacral,
  ChakraSolarPlexus,
  ChakraHeart,
  ChakraThroat,
  ChakraThirdEye,
  ChakraCrown,
  getChakraIcon,
} from './assets/icons/chakras';
export type { ChakraIconProps } from './assets/icons/chakras';

// UI components
export { default as DayWidget } from './components/DayWidget';
export type { CalendarTab } from './components/DayWidget/TabToggle';

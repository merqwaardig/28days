import type { WeekdayInfo, Chakra } from '../types/calendar';

/**
 * Chakra colors taken directly from MAKOYA SVG palette
 * (assets/icons/chakras/*.svg)
 */
const CHAKRAS: Record<number, Chakra> = {
  1: {
    number: 1,
    name: 'Root',
    sanskrit: 'Muladhara',
    color: '#BD151B',
    location: 'Base of spine',
    element: 'Earth',
  },
  2: {
    number: 2,
    name: 'Sacral',
    sanskrit: 'Svadhisthana',
    color: '#F35822',
    location: 'Lower abdomen',
    element: 'Water',
  },
  3: {
    number: 3,
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    color: '#F3B512',
    location: 'Upper abdomen',
    element: 'Fire',
  },
  4: {
    number: 4,
    name: 'Heart',
    sanskrit: 'Anahata',
    color: '#429153',
    location: 'Center of chest',
    element: 'Air',
  },
  5: {
    number: 5,
    name: 'Throat',
    sanskrit: 'Vishuddha',
    color: '#2E6AAC',
    location: 'Throat',
    element: 'Ether',
  },
  6: {
    number: 6,
    name: 'Third Eye',
    sanskrit: 'Ajna',
    color: '#384087',
    location: 'Forehead, between the eyes',
    element: 'Light',
  },
  7: {
    number: 7,
    name: 'Crown',
    sanskrit: 'Sahasrara',
    color: '#600B4C',
    location: 'Top of head',
    element: 'Energy',
  },
};

/**
 * Classical planetary week → chakra mapping
 * Sunday=Sun→3rd, Monday=Moon→2nd, Tuesday=Mars→1st,
 * Wednesday=Mercury→5th, Thursday=Jupiter→6th,
 * Friday=Venus→4th, Saturday=Saturn→7th
 *
 * Indexed by JavaScript Date.getDay() (0 = Sunday ... 6 = Saturday)
 */
export const WEEKDAYS: WeekdayInfo[] = [
  {
    weekday: 'Sunday',
    dayOfTheX: 'Day of the Sun',
    celestialBody: 'Sun',
    chakra: CHAKRAS[3],
  },
  {
    weekday: 'Monday',
    dayOfTheX: 'Day of the Moon',
    celestialBody: 'Moon',
    chakra: CHAKRAS[2],
  },
  {
    weekday: 'Tuesday',
    dayOfTheX: 'Day of Mars',
    celestialBody: 'Mars',
    chakra: CHAKRAS[1],
  },
  {
    weekday: 'Wednesday',
    dayOfTheX: 'Day of Mercury',
    celestialBody: 'Mercury',
    chakra: CHAKRAS[5],
  },
  {
    weekday: 'Thursday',
    dayOfTheX: 'Day of Jupiter',
    celestialBody: 'Jupiter',
    chakra: CHAKRAS[6],
  },
  {
    weekday: 'Friday',
    dayOfTheX: 'Day of Venus',
    celestialBody: 'Venus',
    chakra: CHAKRAS[4],
  },
  {
    weekday: 'Saturday',
    dayOfTheX: 'Day of Saturn',
    celestialBody: 'Saturn',
    chakra: CHAKRAS[7],
  },
];

export { CHAKRAS };

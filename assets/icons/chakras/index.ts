/**
 * Convenience barrel — import any chakra icon by name or
 * use `getChakraIcon(number)` to get the component for a chakra number.
 */
import ChakraRoot from './ChakraRoot';
import ChakraSacral from './ChakraSacral';
import ChakraSolarPlexus from './ChakraSolarPlexus';
import ChakraHeart from './ChakraHeart';
import ChakraThroat from './ChakraThroat';
import ChakraThirdEye from './ChakraThirdEye';
import ChakraCrown from './ChakraCrown';

import type { ChakraNumber } from '../../../types/calendar';

export {
  ChakraRoot,
  ChakraSacral,
  ChakraSolarPlexus,
  ChakraHeart,
  ChakraThroat,
  ChakraThirdEye,
  ChakraCrown,
};

export type ChakraIconProps = {
  size?: number;
  color?: string;
};

type ChakraIconComponent = React.ComponentType<ChakraIconProps>;

const ICONS: Record<ChakraNumber, ChakraIconComponent> = {
  1: ChakraRoot,
  2: ChakraSacral,
  3: ChakraSolarPlexus,
  4: ChakraHeart,
  5: ChakraThroat,
  6: ChakraThirdEye,
  7: ChakraCrown,
};

export function getChakraIcon(number: ChakraNumber): ChakraIconComponent {
  return ICONS[number];
}

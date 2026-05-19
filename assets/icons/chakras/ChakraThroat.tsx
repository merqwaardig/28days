import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 5th Chakra — Throat (Vishuddha)
 * Symbol: inverted triangle (downward-pointing)
 */
export default function ChakraThroat({ size = 48, color = '#2E6AAC' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={24} cy={24} r={24} fill={color} />
      {/* Inverted triangle pointing down */}
      <Path
        d="M24,38.6521739 L36.8676587,16.5933305 L11.1323413,16.5933305 Z"
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

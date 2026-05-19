import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 7th Chakra — Crown (Sahasrara)
 * Symbol: ringed circle (simplified thousand-petaled lotus)
 */
export default function ChakraCrown({ size = 48, color = '#600B4C' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={24} cy={24} r={24} fill={color} />
      <Circle
        cx={24}
        cy={24}
        r={18.7826}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

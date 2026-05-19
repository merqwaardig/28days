import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 1st Chakra — Root (Muladhara)
 * Symbol: square inscribed in circle
 */
export default function ChakraRoot({ size = 48, color = '#BD151B' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={24} cy={24} r={24} fill={color} />
      <Rect
        x={11.4348}
        y={11.4348}
        width={25.1304}
        height={25.1304}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

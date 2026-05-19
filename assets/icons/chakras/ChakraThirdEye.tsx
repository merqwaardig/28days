import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 6th Chakra — Third Eye (Ajna)
 * Symbol: eye / concentric circles
 */
export default function ChakraThirdEye({
  size = 48,
  color = '#384087',
}: Props) {
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
      <Circle
        cx={24}
        cy={24}
        r={7.3043}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

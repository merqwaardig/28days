import React from 'react';
import Svg, { Circle, Ellipse } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 2nd Chakra — Sacral (Svadhisthana)
 * Symbol: circle with crescent moon
 */
export default function ChakraSacral({ size = 48, color = '#F35822' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={24} cy={24} r={24} fill={color} />
      <Circle
        cx={24}
        cy={24}
        r={18.7826}
        stroke="#FFFFFF"
        strokeWidth={1}
        fill="none"
      />
      <Ellipse
        cx={24}
        cy={20.8696}
        rx={17.7391}
        ry={15.6522}
        stroke="#FFFFFF"
        strokeWidth={1}
        fill="none"
      />
    </Svg>
  );
}

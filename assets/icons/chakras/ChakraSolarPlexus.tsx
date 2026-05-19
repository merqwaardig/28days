import React from 'react';
import Svg, { Circle, G, Line } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * 3rd Chakra — Solar Plexus (Manipura)
 * Symbol: sun with 12 rays
 */
export default function ChakraSolarPlexus({
  size = 48,
  color = '#F3B512',
}: Props) {
  // Center the sun within the circle. Outer ring of sun = radius ~10.5
  // Rays extend from radius ~13 to ~17 from center (24, 24)
  const cx = 24;
  const cy = 24;
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const inner = 13;
    const outer = 17;
    return {
      x1: cx + Math.cos(angle) * inner,
      y1: cy + Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * outer,
      y2: cy + Math.sin(angle) * outer,
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={cx} cy={cy} r={24} fill={color} />
      {/* Inner sun: two concentric circles */}
      <Circle cx={cx} cy={cy} r={10.5} stroke="#FFFFFF" strokeWidth={1} fill="none" />
      <Circle cx={cx} cy={cy} r={9.6} stroke="#FFFFFF" strokeWidth={1} fill="none" />
      {/* 12 rays */}
      <G stroke="#FFFFFF" strokeWidth={1} strokeLinecap="round">
        {rays.map((r, i) => (
          <Line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </G>
    </Svg>
  );
}

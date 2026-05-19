import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { getDayInfo } from '../../lib/getDayInfo';
import type { DayInfo } from '../../types/calendar';

import { FlippableCard } from './FlippableCard';

type Props = {
  /** Override "today" — primarily for testing and previews. */
  date?: Date;
};

/**
 * DayWidget — simplified root component.
 *
 * Displays a single flippable card showing today's calendar info.
 * Front: compact weekday/chakra/zodiac/moon/sol info
 * Back: planetary balance/imbalance details
 * Tap to flip between sides.
 */
export default function DayWidget({ date }: Props) {
  const info: DayInfo = useMemo(() => getDayInfo(date), [date]);

  return (
    <View style={styles.container}>
      <FlippableCard info={info} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { getChakraIcon } from '../../assets/icons/chakras';

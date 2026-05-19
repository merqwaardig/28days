import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import FlipCard from 'react-native-flip-card';

import type { DayInfo } from '../../types/calendar';
import { getChakraIcon } from '../../assets/icons/chakras';
import { readableTextOn } from './colorUtils';
import { PLANETARY_CONTENT } from '../../data/planetary-content';

type Props = {
  info: DayInfo;
};

/**
 * FlipCard component showing day info on front, planetary content on back.
 * Tap to flip between sides with smooth animation.
 */
export function FlippableCard({ info }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipRef = useRef<any>(null);

  const handleFlip = () => {
    flipRef.current?.flip();
    setIsFlipped(!isFlipped);
  };

  const bg = info.weekday.chakra.color;
  const textColor = readableTextOn(bg);
  const ChakraIcon = getChakraIcon(info.weekday.chakra.number);
  const planetaryData = PLANETARY_CONTENT[info.weekday.celestialBody];

  return (
    <Pressable onPress={handleFlip} style={styles.wrapper}>
      <FlipCard
        ref={flipRef}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        clickable={false}
        style={styles.flipCard}
      >
        {/* FRONT — Compact Card */}
        <View style={[styles.cardSide, { backgroundColor: bg }]}>
          {/* Top row: zodiac | icon | element */}
          <View style={styles.topRow}>
            <View style={styles.column}>
              <Text style={[styles.meta, { color: textColor }]}>
                {info.zodiac.name}
              </Text>
              <Text style={[styles.meta, { color: textColor }]}>
                {info.dreamspell.isDayOutOfTime
                  ? 'Day Out of Time'
                  : `${info.dreamspell.moon?.name ?? ''} · Day ${info.dreamspell.dayInMoon}`}
              </Text>
            </View>

            <View style={styles.iconBubble}>
              <ChakraIcon size={56} color={bg} />
            </View>

            <View style={[styles.column, styles.columnRight]}>
              <Text style={[styles.meta, { color: textColor }]}>
                {info.weekday.chakra.element}
              </Text>
              <Text style={[styles.meta, { color: textColor }]}>
                {formatShortDate(info.gregorianDate)}
              </Text>
            </View>
          </View>

          {/* Sol row */}
          <View style={styles.solRow}>
            <Text style={[styles.solLabel, { color: textColor }]}>Sol</Text>
            <Text style={[styles.solValue, { color: textColor }]}>
              {info.sol.isYearDay
                ? 'Year Day'
                : info.sol.isLeapDay
                  ? 'Leap Day'
                  : `${info.sol.month?.name ?? ''} · Day ${info.sol.dayInMonth}`}
            </Text>
          </View>

          {/* Tagline */}
          <Text
            style={[styles.tagline, { color: textColor }]}
            numberOfLines={2}
          >
            {info.weekday.weekday} — {info.weekday.dayOfTheX} — Chakra{' '}
            {info.weekday.chakra.number}
          </Text>

          <Text style={[styles.tapHint, { color: textColor }]}>tap to flip</Text>
        </View>

        {/* BACK — Planetary Content */}
        <View style={[styles.cardSide, styles.backSide]}>
          <Text style={styles.backTitle}>{info.weekday.weekday}</Text>
          <Text style={styles.backSubtitle}>
            {info.weekday.celestialBody} · {info.weekday.chakra.name}
          </Text>

          {/* Essence keywords */}
          <View style={styles.essenceRow}>
            {planetaryData.essenceKeywords.map((kw, i) => (
              <Text key={i} style={styles.essenceKeyword}>
                {kw}
                {i < 2 ? ' •' : ''}
              </Text>
            ))}
          </View>

          {/* Aspects */}
          <View style={styles.aspectsRow}>
            {planetaryData.aspectsRow.map((aspect, i) => (
              <Text key={i} style={styles.aspect}>
                {aspect}
                {i < 2 ? ' |' : ''}
              </Text>
            ))}
          </View>

          {/* Deep insight */}
          <View style={styles.insightRow}>
            {planetaryData.deepInsight.map((insight, i) => (
              <Text key={i} style={styles.insight}>
                {insight}
                {i < 2 ? ' - ' : ''}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Balance</Text>
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Physical</Text>
            {planetaryData.balancePhysical.map((item, i) => (
              <Text key={i} style={styles.balanceItem}>
                {item}
              </Text>
            ))}
            <Text style={[styles.balanceLabel, { marginTop: 8 }]}>Mental</Text>
            {planetaryData.balanceMental.map((item, i) => (
              <Text key={i} style={styles.balanceItem}>
                {item}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Imbalance</Text>
          <View style={styles.imbalanceSection}>
            <Text style={styles.imbalanceLabel}>Physical</Text>
            {planetaryData.imbalancePhysical.map((item, i) => (
              <Text key={i} style={styles.imbalanceItem}>
                {item}
              </Text>
            ))}
            <Text style={[styles.imbalanceLabel, { marginTop: 8 }]}>
              Mental
            </Text>
            {planetaryData.imbalanceMental.map((item, i) => (
              <Text key={i} style={styles.imbalanceItem}>
                {item}
              </Text>
            ))}
          </View>

          <Text style={[styles.tapHint, { marginTop: 12 }]}>tap to flip</Text>
        </View>
      </FlipCard>
    </Pressable>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

function formatShortDate(d: Date): string {
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  flipCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardSide: {
    borderRadius: 16,
    padding: 20,
    minHeight: 360,
    justifyContent: 'space-between',
  },
  backSide: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    gap: 2,
  },
  columnRight: {
    alignItems: 'flex-end',
  },
  iconBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  solRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'baseline',
    marginVertical: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  solLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  solValue: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginTop: 4,
  },
  tapHint: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.5,
    marginTop: 8,
  },

  // Back side styles
  backTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  backSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  essenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  essenceKeyword: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  aspectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  aspect: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    letterSpacing: 0.1,
  },
  insightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginBottom: 12,
  },
  insight: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 6,
  },
  balanceSection: {
    gap: 4,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'capitalize',
  },
  balanceItem: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8,
  },
  imbalanceSection: {
    gap: 4,
  },
  imbalanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'capitalize',
  },
  imbalanceItem: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8,
  },
});

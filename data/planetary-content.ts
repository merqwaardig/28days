/**
 * Planetary content mapped to weekdays/celestial bodies.
 * Three layers: core essence, aspects, and balance/imbalance physical/mental states.
 * Translated to English from Mr. Wuwai original Dutch content.
 */

export interface PlanetaryContent {
  celestialBody: string;
  essenceKeywords: [string, string, string];  // e.g. ["Consciousness", "Wisdom", "Intuition"]
  aspectsRow: [string, string, string];       // e.g. ["Visualization", "Awareness", "Perception"]
  deepInsight: [string, string, string];      // e.g. ["Deep insight", "Discipline", "Spiritual growth"]
  balancePhysical: string[];
  balanceMental: string[];
  imbalancePhysical: string[];
  imbalanceMental: string[];
}

export const PLANETARY_CONTENT: Record<string, PlanetaryContent> = {
  Sun: {
    celestialBody: 'Sun',
    essenceKeywords: ['Life force', 'Leadership', 'Self-expression'],
    aspectsRow: ['Transformation', 'Manifestation', 'Authenticity'],
    deepInsight: ['Action', 'Creation', 'Power'],
    balancePhysical: ['Good circulation', 'Strong immune system', 'Vital energy'],
    balanceMental: ['Self-confidence', 'Clarity of purpose', 'Authentic presence'],
    imbalancePhysical: [
      'Cannot relax',
      'Low energy levels',
      'Too much or too little energy',
    ],
    imbalanceMental: [
      'Ego issues',
      'Self-doubt',
      'Difficulty setting boundaries',
    ],
  },

  Moon: {
    celestialBody: 'Moon',
    essenceKeywords: ['Creativity', 'Passion', 'Emotions'],
    aspectsRow: ['Femininity', 'Sensuality', 'Flow'],
    deepInsight: ['Feeling', 'Connection', 'Flexibility'],
    balancePhysical: [
      'Healthy hormones',
      'PMS relief',
      'Bladder problems gone',
    ],
    balanceMental: [
      'Unblocked creativity',
      'Ease in letting go',
      'Abundance mindset',
    ],
    imbalancePhysical: [
      'Pain in lower body',
      'PMS symptoms',
      'Bladder problems',
      'Blocked flow',
    ],
    imbalanceMental: [
      'Blocked creativity',
      'Fear of letting go',
      'Difficulty receiving',
    ],
  },

  Mars: {
    celestialBody: 'Mars',
    essenceKeywords: ['Strength', 'Vitality', 'Courage'],
    aspectsRow: ['Stability', 'Structure', 'Foundation'],
    deepInsight: ['Action', 'Discipline', 'Basis'],
    balancePhysical: [
      'Hip in good condition',
      'Good legs',
      'Good circulation',
      'Chronic pain gone',
      'Spinal problems gone',
      'Constipation resolved',
    ],
    balanceMental: ['Courage', 'Clarity', 'Grounded'],
    imbalancePhysical: [
      'Hip or leg pain',
      'Poor legs',
      'Poor circulation',
      'Chronic pain',
      'Spinal issues',
      'Constipation',
    ],
    imbalanceMental: ['Fear', 'Uncertainty', 'Lack grounding'],
  },

  Mercury: {
    celestialBody: 'Mercury',
    essenceKeywords: ['Communication', 'Creativity', 'Self-expression'],
    aspectsRow: ['Intellect', 'Speech', 'Clarity of thought'],
    deepInsight: ['Clarity', 'Truth', 'Expression'],
    balancePhysical: [
      'Jaw healthy',
      'Hearing clear',
      'Throat problems resolved',
      'Ability to express easily',
    ],
    balanceMental: [
      'Can formulate thoughts clearly',
      'Ease in expressing',
      'No anxiety',
      'Blocked creativity eased',
    ],
    imbalancePhysical: [
      'Jaw problems',
      'Hearing loss',
      'Throat problems',
      'Unable to express easily',
    ],
    imbalanceMental: [
      'Difficulty formulating thoughts',
      'Anxiety',
      'Blocked creativity',
    ],
  },

  Jupiter: {
    celestialBody: 'Jupiter',
    essenceKeywords: ['Spiritual connection', 'Cosmic consciousness'],
    aspectsRow: ['Pure energy', 'Illumination', 'Universal unity'],
    deepInsight: ['Expansion', 'Wisdom', 'Higher knowledge'],
    balancePhysical: [
      'Headache or migraine gone',
      'Sleep problems resolved',
      'Drowsiness gone',
    ],
    balanceMental: [
      'Confusion eased',
      'Spiritual arrogance gone',
      'Over-analysis resolved',
      'Mental chaos resolved',
    ],
    imbalancePhysical: [
      'Headache or migraine',
      'Sleep problems',
      'Sleepiness',
    ],
    imbalanceMental: [
      'Confusion',
      'Spiritual arrogance',
      'Over-analysis',
      'Mental chaos',
    ],
  },

  Venus: {
    celestialBody: 'Venus',
    essenceKeywords: ['Harmony', 'Love', 'Openness'],
    aspectsRow: ['Relationships', 'Beauty', 'Fulfillment'],
    deepInsight: ['Freedom', 'Spaciousness', 'Love'],
    balancePhysical: [
      'Heart healthy',
      'Good circulation',
      'Good bleeding',
      'Good energy level',
    ],
    balanceMental: [
      'Trust in relationships',
      'Ability to forgive',
      'Gratitude present',
      'Emotional distance gone',
    ],
    imbalancePhysical: [
      'Heart problems',
      'Poor circulation',
      'Bleeding issues',
      'Low energy level',
    ],
    imbalanceMental: [
      'Distrust in relationships',
      'Inability to forgive',
      'Lack gratitude',
      'Emotional detachment',
    ],
  },

  Saturn: {
    celestialBody: 'Saturn',
    essenceKeywords: ['Consciousness', 'Wisdom', 'Intuition'],
    aspectsRow: ['Visualization', 'Awareness', 'Perception'],
    deepInsight: ['Deep insight', 'Discipline', 'Spiritual growth'],
    balancePhysical: [
      'Pineal gland active',
      'Sleep problems gone',
      'Eye problems resolved',
      'Ability to express yourself',
    ],
    balanceMental: [
      'Can formulate your thoughts',
      'Ease of being yourself',
      'Self-confidence',
      'Blocked creativity eased',
    ],
    imbalancePhysical: [
      'Pineal gland issues',
      'Sleep problems',
      'Eye problems',
      'Unable to express yourself',
    ],
    imbalanceMental: [
      'Difficulty formulating thoughts',
      'Anxiety',
      'Blocked creativity',
    ],
  },
};

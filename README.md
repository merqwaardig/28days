# MAKOYA Calendar Module

13 Moon Dreamspell + Sol (IFC) calendar widget voor MAKOYA.

## Wat erin zit

```
calendar/
├── index.ts                           ← één import-punt
├── types/calendar.ts                  ← TypeScript types
├── data/
│   ├── weekdays.ts                    ← weekdag → planeet + chakra (7-element system)
│   ├── moons.ts                       ← 13 Dreamspell manen
│   ├── zodiacs.ts                     ← 13 sterrenbeelden (incl. Ophiuchus)
│   ├── sol-months.ts                  ← 13 IFC maanden
│   └── planetary-content.ts           ← balance/imbalance content per planet
├── lib/getDayInfo.ts                  ← berekeningsfunctie
├── assets/icons/chakras/              ← 7 react-native-svg chakra-iconen
├── components/DayWidget/              ← UI componenten
│   ├── index.tsx                      ← <DayWidget /> hoofdcomponent
│   ├── FlippableCard.tsx              ← flip-card: voorkant + achterkant
│   └── colorUtils.ts                  ← contrast-berekening
└── __tests__/getDayInfo.test.ts       ← 72 tests
```

## Installeren in MAKOYA

1. Kopieer de hele `calendar/` map naar je MAKOYA project (b.v. `src/calendar/`)

2. Installeer dependencies:
   ```bash
   npx expo install react-native-svg react-native-flip-card
   ```

3. Klaar — import en use.

## Gebruik

```tsx
import { DayWidget } from '@/calendar';

export default function HomeScreen() {
  return (
    <View style={{ padding: 20 }}>
      <DayWidget />
    </View>
  );
}
```

### Props

```tsx
<DayWidget
  date={new Date(2026, 6, 25)}  // optioneel — override "today"
/>
```

## Hoe het werkt

**Voorkant (default):**
- Zodiac, Moon, Sol, Element, Date
- Weekday · Celestial body · Chakra
- Tap to flip

**Achterkant (flip):**
- Planetary essence (keywords, aspects, insights)
- Balance: physical & mental
- Imbalance: physical & mental
- Tap to flip terug

Sol staat zichtbaar op beide zijdes — in de voorkant in dezelfde positie als Moon, op de achterkant bovenaan de planetary info.

## Achtergrond-kleuren

Kaart-achtergrond volgt automatisch de chakra-kleur van de huidige weekdag (zondag = geel, maandag = oranje, etc.).

## Tests draaien

```bash
npx tsx __tests__/getDayInfo.test.ts
```

72 tests, geverifieerd tegen de referentie-kalender en chakra-elementen.

## Vastgelegde beslissingen

### Calendar systems
- **Dreamspell jaar start 26 juli** (Magnetic Moon dag 1)
- **Day Out of Time = 25 juli** (geen maan, geen dag-in-jaar)
- **Sol jaar start 1 januari** (IFC blijft Gregoriaans qua jaarbegin)
- **Sol maand 7 = "Sol"** tussen Juni en Juli (28 dagen)
- **Year Day = 31 december** (zonder weekdag in IFC concept)
- **Leap Day = 17 juni** in schrikkeljaren (alleen in Sol-systeem)
- **Zodiac = astronomisch IAU 1930**, inclusief Ophiuchus

### Chakra system
- **7-element tantric mapping** (Earth/Water/Fire/Air/Ether/Light/Energy)
- **Planetaire weekdag-koppeling**:
  Sun=3rd (Fire), Moon=2nd (Water), Mars=1st (Earth),
  Mercury=5th (Ether), Jupiter=6th (Light), Venus=4th (Air), Saturn=7th (Energy)
- **Planetary balance/imbalance content** — Mr. Wuwai framework, translated to English

### UI
- **Flip-card animation** — react-native-flip-card library
- **Sol visible on front** — no separate tabs, both systems always shown
- **Element shown = chakra element** — 7-element system, not 4-element moon system
- **Planetary content on back** — balance + imbalance states per day

Vragen of wijzigingen → tests eerst aanpassen in `__tests__/`, dan code.

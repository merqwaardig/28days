/**
 * Compute relative luminance of a hex color and decide whether to use
 * white or dark text on top of it for sufficient contrast.
 *
 * Uses WCAG-style luminance formula.
 */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function hexIsDark(hex: string): boolean {
  return relativeLuminance(hex) < 0.5;
}

/**
 * Return white or dark text color appropriate for the given background.
 * Threshold tuned slightly toward white-on-color for vibrant brand feel.
 */
export function readableTextOn(bg: string): string {
  return relativeLuminance(bg) < 0.55 ? '#FFFFFF' : '#1A1A1A';
}

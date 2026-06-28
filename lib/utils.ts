/** Tiny classname joiner — no deps, keeps markup readable. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Linear interpolation — used by the aura canvas + custom cursor for smooth easing. */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Clamp a value into [min, max]. */
export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

/**
 * Detects content that Nikitha still needs to fill in. Anything matching renders
 * a small gold `[add link]` badge in the UI instead of a dead link.
 */
export function isPlaceholder(value?: string | null): boolean {
  if (!value) return true;
  const v = value.trim();
  return (
    v === "" ||
    v === "#" ||
    v.startsWith("YOUR_") ||
    v.toUpperCase().includes("PLACEHOLDER") ||
    v.toUpperCase().includes("TODO")
  );
}

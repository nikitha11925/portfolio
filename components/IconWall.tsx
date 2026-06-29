/**
 * Raining tech-icon background. The source PNGs in /public/icons are solid black
 * on transparent and are kept exactly that colour — visibility comes purely from
 * a neon outline+glow (see `.rain-drop` in globals.css) in the same warm tone as
 * the TV frame. Each drop falls independently (varied lane, size, speed, delay)
 * so the field reads as continuous rain rather than a scrolling tape.
 *
 * All values are derived deterministically from the index (no Math.random) so the
 * server and client render identically — no hydration mismatch.
 */

const ICONS = ["coding", "python", "java", "cube", "atom", "github", "java-script", "saas", "scroll"];
// Fewer drops so the field reads as light, spread-out rain rather than congestion.
const DROP_COUNT = 16;

const DROPS = Array.from({ length: DROP_COUNT }, (_, i) => ({
  icon: ICONS[i % ICONS.length],
  left: (i * 41) % 100, // scattered horizontal lane (%)
  size: 28 + ((i * 13) % 28), // 28–55px
  duration: 7 + ((i * 5) % 9), // 7–15s fall time
  delay: -((i * 7) % 15), // staggered start so rain is continuous from load
  opacity: 0.4 + ((i * 17) % 50) / 100, // 0.40–0.89 for depth
}));

export default function IconWall() {
  return (
    <div
      className="icon-wall pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-[60%] md:block"
      aria-hidden="true"
    >
      {DROPS.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/icons/${d.icon}.png`}
          alt=""
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

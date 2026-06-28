/**
 * SWAP: replace with actual pixel art image.
 *
 * Until then, this is a CSS/SVG pixel-art silhouette — a little figure with a
 * raised, waving hand, rendered crisply with `shape-rendering: crispEdges`.
 * It's a placeholder, but an intentional one.
 *
 * Grid legend (16×16):
 *   .  empty      h  hair (gold)     s  skin (cream)
 *   e  eye (base) b  body (cream)    a  arm (cream)    w  hand (gold)
 */
const GRID = [
  "................",
  ".....hhhh.....ww.",
  "....hhhhhh...ww..",
  "....hssssh..aa...",
  "....hssssh.aa....",
  "....hseseh.a.....",
  "....hsssshaa....",
  "....hseesh......",
  "....hssssh......",
  ".....ssss.......",
  "...bbbbbbbb.....",
  "..bbbbbbbbbb....",
  "..bbbbbbbbbb....",
  "..bbbbbbbbbb....",
  "..bbb....bbb....",
  "..bbb....bbb....",
];

const COLORS: Record<string, string> = {
  h: "#c9b99a", // hair — gold
  w: "#c9b99a", // waving hand — gold
  s: "#e8e0d5", // skin — cream
  b: "#e8e0d5", // body — cream
  a: "#e8e0d5", // arm — cream
  e: "#080808", // eyes — base
};

export default function PixelAvatar({ size = 180 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className="pixelated"
      role="img"
      aria-label="Pixel-art avatar of Nikitha waving"
    >
      {GRID.flatMap((row, y) =>
        row.split("").map((cell, x) => {
          const fill = COLORS[cell];
          if (!fill) return null;
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />
          );
        })
      )}
    </svg>
  );
}

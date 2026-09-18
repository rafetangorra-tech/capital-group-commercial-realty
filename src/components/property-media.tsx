import Image from "next/image";

/**
 * PropertyMedia — art-directed placeholder plate or real photograph.
 *
 * When `image` is provided it renders an optimized <Image fill>. Otherwise it
 * generates a deterministic duotone architectural SVG from `seed` + `index`,
 * so the site looks intentional and self-contained until real photography is
 * dropped in. Fully deterministic (no Math.random / Date) → SSR-safe.
 */

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = [
  // [skyTop, skyBottom, glow, buildingBack, buildingMid, buildingFront, window]
  ["#0c1620", "#22303c", "#b0894b", "#0e1b28", "#122536", "#0a141d", "#cbae79"],
  ["#0b1a24", "#1d3340", "#c69a5a", "#102530", "#16303d", "#0a1720", "#e4c887"],
  ["#0c1420", "#283645", "#8ea0ae", "#111f2c", "#16293a", "#0b1520", "#d7e0e8"],
  ["#0e1622", "#243444", "#b8905a", "#11202e", "#183042", "#0b141e", "#dcc088"],
];

export interface PropertyMediaProps {
  seed: number;
  index?: number;
  image?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
}

export function PropertyMedia({
  seed,
  index = 0,
  image,
  alt = "",
  priority,
  sizes = "100vw",
  className = "",
  rounded,
}: PropertyMediaProps) {
  if (image) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const uid = `p${seed}_${index}`;
  const rand = mulberry32(seed * 1000 + index * 97 + 7);
  const pal = PALETTES[(seed + index) % PALETTES.length];
  const [skyTop, skyBottom, glow, bBack, bMid, bFront, win] = pal;

  const W = 1600;
  const H = 1000;
  const ground = H * (0.66 + rand() * 0.06);

  // Build three depth layers of a skyline.
  type B = { x: number; w: number; y: number; fill: string; lit: number };
  const buildings: B[] = [];

  function layer(count: number, fill: string, minH: number, maxH: number, lit: number) {
    let x = -40 + rand() * 30;
    for (let i = 0; i < count; i++) {
      const w = 70 + rand() * 150;
      const h = (minH + rand() * (maxH - minH)) * H;
      buildings.push({ x, w, y: ground - h, fill, lit });
      x += w + rand() * 26;
      if (x > W + 60) break;
    }
  }

  layer(10, bBack, 0.18, 0.42, 0.2);
  layer(8, bMid, 0.3, 0.6, 0.5);
  layer(6, bFront, 0.42, 0.78, 0.85);

  // Windows for each building
  function windows(b: B) {
    const rects: React.ReactNode[] = [];
    const cols = Math.max(2, Math.floor(b.w / 26));
    const gap = b.w / cols;
    const winW = gap * 0.5;
    const winH = 12;
    const rowGap = 26;
    const rows = Math.floor((ground - b.y - 20) / rowGap);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const on = rand() < b.lit * 0.5;
        const wx = b.x + c * gap + (gap - winW) / 2;
        const wy = b.y + 16 + r * rowGap;
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={wx}
            y={wy}
            width={winW}
            height={winH}
            fill={win}
            opacity={on ? 0.55 + rand() * 0.35 : 0.08}
          />,
        );
      }
    }
    return rects;
  }

  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="70%" stopColor={skyBottom} />
            <stop offset="100%" stopColor={skyTop} />
          </linearGradient>
          <radialGradient
            id={`glow-${uid}`}
            cx={`${25 + rand() * 55}%`}
            cy="34%"
            r="46%"
          >
            <stop offset="0%" stopColor={glow} stopOpacity="0.55" />
            <stop offset="55%" stopColor={glow} stopOpacity="0.12" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`vig-${uid}`} cx="50%" cy="46%" r="72%">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#sky-${uid})`} />
        <rect width={W} height={H} fill={`url(#glow-${uid})`} />

        {/* haze band behind skyline */}
        <rect
          x="0"
          y={ground - 200}
          width={W}
          height="200"
          fill={glow}
          opacity="0.06"
        />

        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={ground - b.y} fill={b.fill} />
            {windows(b)}
          </g>
        ))}

        {/* ground / plaza */}
        <rect x="0" y={ground} width={W} height={H - ground} fill={bFront} />
        <rect
          x="0"
          y={ground}
          width={W}
          height="2"
          fill={glow}
          opacity="0.4"
        />

        <rect width={W} height={H} fill={`url(#vig-${uid})`} />
      </svg>
      <div className="grain absolute inset-0" />
    </div>
  );
}

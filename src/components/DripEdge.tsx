import { motion, useReducedMotion } from 'motion/react';
import './DripEdge.css';

/* The logo's dripping "d" is the brand's one graphic idea. Every place two
   surfaces meet on this site, the chocolate runs over the edge. */

const W = 1440;
const H = 124;
const BASE = 26;

interface Drop {
  x: number;
  w: number;
  d: number;
}

const DROPS: Drop[] = [
  { x: 92, w: 15, d: 54 },
  { x: 214, w: 22, d: 88 },
  { x: 352, w: 12, d: 34 },
  { x: 470, w: 26, d: 66 },
  { x: 604, w: 16, d: 100 },
  { x: 726, w: 20, d: 44 },
  { x: 858, w: 13, d: 74 },
  { x: 980, w: 24, d: 56 },
  { x: 1106, w: 15, d: 92 },
  { x: 1232, w: 21, d: 38 },
  { x: 1356, w: 14, d: 62 },
];

function buildPath(drops: Drop[]): string {
  let path = `M0,${BASE}`;
  for (const { x, w, d } of drops) {
    const l = x - w;
    const r = x + w;
    const neck = BASE + d * 0.5;
    const bulb = BASE + d * 0.95;
    // concave shoulder running into the neck
    path += ` C${l - w * 1.2},${BASE} ${l - w * 0.2},${BASE + d * 0.28} ${l},${neck}`;
    // round tip
    path += ` C${l - w * 0.55},${bulb} ${r + w * 0.55},${bulb} ${r},${neck}`;
    // shoulder back up to the baseline
    path += ` C${r + w * 0.2},${BASE + d * 0.28} ${r + w * 1.2},${BASE} ${r + w * 1.4},${BASE}`;
  }
  path += ` L${W},${BASE} L${W},0 L0,0 Z`;
  return path;
}

const PATH = buildPath(DROPS);

interface DripEdgeProps {
  /** CSS colour of the surface *above* the edge — this is what drips. */
  from: string;
  /** CSS colour of the surface *below* the edge. */
  to: string;
  flip?: boolean;
  /** Height of the band. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DripEdge({ from, to, flip = false, size = 'md', className = '' }: DripEdgeProps) {
  const still = useReducedMotion();

  return (
    <div
      className={`drip drip--${size}${flip ? ' drip--flip' : ''} ${className}`}
      style={{ background: to }}
      aria-hidden="true"
    >
      <motion.svg
        className="drip__svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        initial={still ? undefined : { y: '-88%' }}
        whileInView={still ? undefined : { y: '0%' }}
        viewport={{ once: true, margin: '0px 0px -6% 0px' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d={PATH} fill={from} />
      </motion.svg>

      {/* one droplet that has already let go */}
      <span className="drip__bead" style={{ background: from }} />
    </div>
  );
}

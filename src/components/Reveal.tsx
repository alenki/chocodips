import { motion, useReducedMotion } from 'motion/react';
import type { Transition, Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay — the backbone of the staggered page reveals. */
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: RevealDirection;
  className?: string;
  as?: ElementType;
  /** How far into the viewport before it fires. */
  margin?: string;
  once?: boolean;
}

function offset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
}

export function Reveal({
  children,
  delay = 0,
  duration = 1.05,
  distance = 34,
  direction = 'up',
  className,
  as = 'div',
  margin = '-12% 0px -12% 0px',
  once = true,
}: RevealProps) {
  const still = useReducedMotion();
  const Tag = motion[as as 'div'] ?? motion.div;

  if (still) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, filter: 'blur(7px)', ...offset(direction, distance) }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once, margin: margin as never }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================================
   MASK REVEAL — a line of type wiped up from behind its own baseline.
   Used for every display headline on the site.
   ========================================================================== */

interface RevealLineProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** Extra bottom padding so descenders are not clipped by the mask. */
  bleed?: number;
}

const lineVariants: Variants = {
  hidden: { y: '115%', rotate: 2.5 },
  shown: { y: '0%', rotate: 0 },
};

export function RevealLine({
  children,
  delay = 0,
  duration = 1.15,
  className,
  bleed = 0.16,
}: RevealLineProps) {
  const still = useReducedMotion();

  if (still) return <span className={className}>{children}</span>;

  /* The in-view trigger lives on the OUTER span. Watching the inner one would
     deadlock: it starts translated fully outside its own overflow mask, so an
     IntersectionObserver on it never reports an intersection and a wrapped,
     multi-line heading would stay hidden forever. */
  return (
    <motion.span
      style={{
        display: 'block',
        overflow: 'hidden',
        paddingBottom: `${bleed}em`,
        marginBottom: `-${bleed}em`,
      }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-8% 0px -8% 0px' as never }}
    >
      <motion.span
        className={className}
        style={{ display: 'block', willChange: 'transform' }}
        variants={lineVariants}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* ==========================================================================
   WORD-BY-WORD REVEAL — for the two hero lines only. Deliberately expensive.
   ========================================================================== */

export function RevealWords({
  text,
  delay = 0,
  step = 0.075,
  className,
}: {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  const words = text.split(' ');

  if (still) return <span className={className}>{text}</span>;

  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            paddingBottom: '0.14em',
            marginBottom: '-0.14em',
            verticalAlign: 'bottom',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%', rotate: 3 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1.25, delay: delay + i * step, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ==========================================================================
   STAGGER — parent/child pair for grids and lists.
   ========================================================================== */

const parentVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 46, filter: 'blur(8px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const childTransition: Transition = { duration: 1, ease: EASE };

export function Stagger({
  children,
  className,
  margin = '-10% 0px -10% 0px',
}: {
  children: ReactNode;
  className?: string;
  margin?: string;
}) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: margin as never }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const still = useReducedMotion();
  if (still) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  const Tag = motion[as as 'div'] ?? motion.div;
  return (
    <Tag className={className} variants={childVariants} transition={childTransition}>
      {children}
    </Tag>
  );
}

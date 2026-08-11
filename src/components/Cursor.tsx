import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useFinePointer } from '../hooks/useMediaQuery';
import './Cursor.css';

type CursorMode = 'default' | 'link' | 'media';

/**
 * A drop of chocolate that follows the pointer, with a lagging molten ring.
 * Only mounts where there is a real pointer; never on touch.
 */
export function Cursor() {
  const fine = useFinePointer();
  const still = useReducedMotion();
  const enabled = fine && !still;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 190, damping: 22, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 190, damping: 22, mass: 0.55 });

  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('cursor-hidden');
    return () => document.body.classList.remove('cursor-hidden');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const zone = target?.closest?.('[data-cursor]') as HTMLElement | null;
      if (zone) {
        const next = zone.dataset.cursor as CursorMode;
        setMode(next === 'media' ? 'media' : 'link');
        setLabel(zone.dataset.cursorLabel ?? '');
      } else if (target?.closest?.('a, button, input, textarea, select, [role="button"]')) {
        setMode('link');
        setLabel('');
      } else {
        setMode('default');
        setLabel('');
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = mode === 'media' ? 108 : mode === 'link' ? 54 : 30;

  return (
    <div className="cursor" aria-hidden="true">
      <motion.div
        className={`cursor__ring cursor__ring--${mode}`}
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        {mode === 'media' && label ? <span className="cursor__label">{label}</span> : null}
      </motion.div>

      <motion.div
        className="cursor__bead"
        style={{ x, y }}
        animate={{
          opacity: visible && mode !== 'media' ? 1 : 0,
          scale: pressed ? 0.6 : 1,
        }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      />
    </div>
  );
}

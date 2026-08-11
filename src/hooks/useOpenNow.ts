import { useEffect, useState } from 'react';
import { cafe } from '../data/cafe';

/** Local time in Nalchik (Europe/Moscow), as a decimal hour. */
function nalchikHour(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return hour + minute / 60;
}

/** Live open/closed state, so the site never claims to be open at 3am. */
export function useOpenNow(): boolean {
  const [open, setOpen] = useState(() => {
    const h = nalchikHour();
    return h >= cafe.hours.open && h < cafe.hours.close;
  });

  useEffect(() => {
    const tick = () => {
      const h = nalchikHour();
      setOpen(h >= cafe.hours.open && h < cafe.hours.close);
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return open;
}

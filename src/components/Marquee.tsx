import './Marquee.css';

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
  reverse?: boolean;
  /** Display-size ticker vs. small tracked label ticker. */
  scale?: 'display' | 'label';
  tone?: 'ink' | 'cream' | 'molten' | 'outline';
  separator?: string;
  className?: string;
}

export function Marquee({
  items,
  speed = 42,
  reverse = false,
  scale = 'label',
  tone = 'ink',
  separator = '·',
  className = '',
}: MarqueeProps) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item, i) => (
        <span className="marquee__item" key={`${item}-${i}`}>
          <span className="marquee__text">{item}</span>
          <span className="marquee__sep">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee marquee--${scale} marquee--${tone} ${className}`}
      style={{ ['--marquee-dur' as string]: `${speed}s` }}
    >
      <div className={`marquee__row${reverse ? ' marquee__row--rev' : ''}`}>
        {track}
        {track}
      </div>
      <span className="sr-only">{items.join(` ${separator} `)}</span>
    </div>
  );
}

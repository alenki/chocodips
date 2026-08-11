import { useState } from 'react';
import { motion } from 'motion/react';
import { cafe } from '../data/cafe';
import { useLocale } from '../i18n/context';
import type { Composed } from '../lib/compose';

export function ReadyPanel({ composed, onEdit }: { composed: Composed; onEdit: () => void }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(composed.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked — the text is on screen and selectable anyway */
    }
  };

  return (
    <motion.div
      className="ready"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="ready__h display display--lg">{t('form.ready.title')}</h3>
      <p className="ready__note">{t('form.ready.note')}</p>

      <pre className="ready__pre">{composed.text}</pre>

      <div className="ready__btns">
        <a
          className="btn btn--molten"
          href={composed.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
        >
          {t('form.ready.open')}
          <span className="btn__arrow">↗</span>
        </a>

        <button type="button" className="btn btn--ghost-inv" onClick={copy} data-cursor="link">
          {copied ? t('form.ready.copied') : t('form.ready.copy')}
        </button>

        <button type="button" className="tlink" onClick={onEdit} data-cursor="link">
          {t('form.ready.again')}
        </button>

        <span className="ready__or">
          {t('form.ready.or')} <a href={cafe.phone.href}>{cafe.phone.display}</a>
        </span>
      </div>
    </motion.div>
  );
}

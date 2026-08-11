import { useMemo, useState } from 'react';
import { cafe } from '../data/cafe';
import { menu } from '../data/menu';
import { useLocale } from '../i18n/context';
import type { CopyKey } from '../i18n/dict';
import { compose } from '../lib/compose';
import { DripEdge } from '../components/DripEdge';
import { DropRating, TextArea, TextField } from '../components/Field';
import { ReadyPanel } from '../components/ReadyPanel';
import { Reveal, RevealLine } from '../components/Reveal';
import './Reviews.css';

const HERO_SHOT = menu.find((item) => item.id === 'fondant')!;

export function Reviews() {
  const { t, pick, locale } = useLocale();

  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [dish, setDish] = useState('');
  const [text, setText] = useState('');
  /* Keys, not resolved strings — a locale switch must re-translate both the
     validation messages and the composed WhatsApp text. */
  const [errors, setErrors] = useState<Record<string, CopyKey>>({});
  const [sent, setSent] = useState(false);

  const composed = useMemo(
    () =>
      compose(t('wa.review.intro'), [
        [t('wa.rating'), rating ? `${rating}/5` : ''],
        [t('reviews.form.name'), name],
        [t('reviews.form.contact'), contact],
        [t('reviews.form.dish'), dish],
        [t('reviews.form.text'), text],
      ]),
    [t, rating, name, contact, dish, text],
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, CopyKey> = {};
    if (!name.trim()) next.name = 'form.error.name';
    if (!contact.trim()) next.contact = 'form.error.contact';
    if (text.trim().length < 3) next.text = 'form.error.text';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  };

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="rh">
        <span className="rh__glow" aria-hidden="true" />
        <div className="container rh__inner">
          <div className="rh__type">
            <Reveal>
              <span className="eyebrow">{t('reviews.eyebrow')}</span>
            </Reveal>

            <h1 className="rh__h display display--giant">
              <RevealLine delay={0.04}>{t('reviews.l1')}</RevealLine>
              <RevealLine delay={0.15}>
                <span className="em em--molten">{t('reviews.l2')}</span>
              </RevealLine>
            </h1>

            <Reveal delay={0.22}>
              <p className="lede rh__lede">{t('reviews.lede')}</p>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="rh__media">
            <figure className="frame frame--warm frame--hover ratio-1-1">
              <img src={HERO_SHOT.images[0]} alt={pick(HERO_SHOT.name)} loading="lazy" />
            </figure>
            <figcaption className="label rh__cap">
              {pick(HERO_SHOT.name)} · {HERO_SHOT.price} {t('common.currency')}
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ FORM */}
      <section className="rsec slab">
        <div className="container rsec__inner">
          <div className="rsec__head">
            <Reveal>
              <span className="eyebrow eyebrow--molten">{cafe.city[locale]}</span>
            </Reveal>
            <h2 className="rsec__h display display--xl">
              <RevealLine delay={0.05}>{t('reviews.form.text')}</RevealLine>
            </h2>
            <Reveal delay={0.14}>
              <p className="rsec__note">{t('reviews.direct.note')}</p>
            </Reveal>
          </div>

          <div className="rsec__body">
            {sent ? (
              <ReadyPanel composed={composed} onEdit={() => setSent(false)} />
            ) : (
              <form className="frm" onSubmit={submit} noValidate>
                <div className="frm__rating">
                  <DropRating
                    label={t('reviews.form.rating')}
                    hint={t('reviews.form.ratingHint')}
                    scoreLabel={(score) => `${score} ${t('reviews.form.ratingOf')} 5`}
                    value={rating}
                    onChange={setRating}
                  />
                </div>

                <TextField
                  id="rv-name"
                  label={t('reviews.form.name')}
                  value={name}
                  onChange={setName}
                  placeholder={t('reviews.form.namePlaceholder')}
                  error={errors.name ? t(errors.name) : undefined}
                  autoComplete="name"
                />
                <TextField
                  id="rv-contact"
                  label={t('reviews.form.contact')}
                  value={contact}
                  onChange={setContact}
                  placeholder={t('reviews.form.contactPlaceholder')}
                  error={errors.contact ? t(errors.contact) : undefined}
                />
                <TextField
                  id="rv-dish"
                  label={t('reviews.form.dish')}
                  value={dish}
                  onChange={setDish}
                  placeholder={t('reviews.form.dishPlaceholder')}
                  wide
                />
                <TextArea
                  id="rv-text"
                  label={t('reviews.form.text')}
                  value={text}
                  onChange={setText}
                  placeholder={t('reviews.form.textPlaceholder')}
                  error={errors.text ? t(errors.text) : undefined}
                  rows={6}
                />

                <div className="frm__actions">
                  <button type="submit" className="btn btn--molten" data-cursor="link">
                    {t('reviews.form.submit')}
                    <span className="btn__arrow">→</span>
                  </button>
                  <p className="frm__legal">{t('form.ready.note')}</p>
                </div>
              </form>
            )}
          </div>
        </div>

        <DripEdge from="var(--cocoa-900)" to="var(--cream)" size="md" />
      </section>

      {/* ============================================================== DIRECT */}
      <section className="section direct">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('reviews.direct.title')}</span>
          </Reveal>

          <div className="direct__grid">
            <Reveal delay={0.08}>
              <a className="direct__card" href={cafe.phone.href} data-cursor="link">
                <span className="label direct__k">{t('common.phone')}</span>
                <span className="direct__v display display--lg">{cafe.phone.display}</span>
                <span className="direct__go">→</span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                className="direct__card"
                href={cafe.instagram.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                <span className="label direct__k">{t('common.instagram')}</span>
                <span className="direct__v display display--lg">{cafe.instagram.handle}</span>
                <span className="direct__go">↗</span>
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                className="direct__card"
                href={cafe.routeHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                <span className="label direct__k">{t('common.address')}</span>
                <span className="direct__v display display--lg">{cafe.street[locale]}</span>
                <span className="direct__go">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

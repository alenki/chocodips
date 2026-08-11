import { useMemo, useState } from 'react';
import { cafe } from '../data/cafe';
import { menu } from '../data/menu';
import { useLocale } from '../i18n/context';
import type { CopyKey } from '../i18n/dict';
import { compose } from '../lib/compose';
import { SelectField, TextArea, TextField } from '../components/Field';
import { ReadyPanel } from '../components/ReadyPanel';
import { Reveal, RevealLine } from '../components/Reveal';
import './Careers.css';

const HERO_SHOT = menu.find((item) => item.id === 'cinnabon')!;

/** Stable values; only the label is translated. */
const ROLE_KEYS: { value: string; key: CopyKey }[] = [
  { value: 'pastry-chef', key: 'careers.form.role1' },
  { value: 'barista', key: 'careers.form.role2' },
  { value: 'waiter', key: 'careers.form.role3' },
  { value: 'host', key: 'careers.form.role4' },
  { value: 'other', key: 'careers.form.role5' },
];

export function Careers() {
  const { t, pick, locale } = useLocale();

  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  /* Errors and the composed message are stored as keys / derived values, never
     as resolved strings — otherwise switching locale would strand them in the
     previous language. */
  const [errors, setErrors] = useState<Record<string, CopyKey>>({});
  const [sent, setSent] = useState(false);

  const roles = ROLE_KEYS.map((r) => ({ value: r.value, label: t(r.key) }));

  const values = [
    { n: '01', title: t('careers.value1.t'), body: t('careers.value1.d') },
    { n: '02', title: t('careers.value2.t'), body: t('careers.value2.d') },
    { n: '03', title: t('careers.value3.t'), body: t('careers.value3.d') },
  ];

  const composed = useMemo(() => {
    const roleKey = ROLE_KEYS.find((r) => r.value === role)?.key;
    return compose(t('wa.career.intro'), [
      [t('careers.form.role'), roleKey ? t(roleKey) : ''],
      [t('careers.form.name'), name],
      [t('careers.form.contact'), contact],
      [t('careers.form.about'), about],
    ]);
  }, [t, role, name, contact, about]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, CopyKey> = {};
    if (!role) next.role = 'form.error.role';
    if (!name.trim()) next.name = 'form.error.name';
    if (!contact.trim()) next.contact = 'form.error.contact';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  };

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="ch">
        <div className="container ch__inner">
          <div className="ch__type">
            <Reveal>
              <span className="eyebrow">{t('careers.eyebrow')}</span>
            </Reveal>

            <h1 className="ch__h display display--giant">
              <RevealLine delay={0.04}>{t('careers.l1')}</RevealLine>
              <RevealLine delay={0.15}>
                <span className="em em--molten">{t('careers.l2')}</span>
              </RevealLine>
            </h1>

            <Reveal delay={0.22}>
              <p className="lede ch__lede">{t('careers.lede')}</p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="ch__meta">
                <span className="label">{cafe.addressFull[locale]}</span>
                <span className="ch__dot" />
                <a className="label ch__phone" href={cafe.phone.href} data-cursor="link">
                  {cafe.phone.display}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="ch__media">
            <figure className="frame frame--warm frame--hover ratio-4-5">
              <img src={HERO_SHOT.images[0]} alt={pick(HERO_SHOT.name)} loading="lazy" />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ============================================================== VALUES */}
      <section className="section vals">
        <div className="container">
          <Reveal>
            <span className="eyebrow vals__eyebrow">{t('careers.values.title')}</span>
          </Reveal>

          <div className="vals__grid">
            {values.map((value, i) => (
              <Reveal key={value.n} delay={0.08 + i * 0.09} className="vals__card">
                <span className="num vals__n">{value.n}</span>
                <h2 className="vals__t display display--lg">{value.title}</h2>
                <p className="vals__d">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ FORM */}
      <section className="fsec slab">
        <div className="container fsec__inner">
          <div className="fsec__head">
            <Reveal>
              <span className="eyebrow eyebrow--molten">{t('careers.eyebrow')}</span>
            </Reveal>
            <h2 className="fsec__h display display--xl">
              <RevealLine delay={0.05}>{t('careers.form.title')}</RevealLine>
            </h2>

            <Reveal delay={0.16}>
              <dl className="fsec__aside">
                <div className="fsec__row">
                  <dt className="label">{t('common.address')}</dt>
                  <dd>{cafe.addressFull[locale]}</dd>
                </div>
                <div className="fsec__row">
                  <dt className="label">{t('common.hours')}</dt>
                  <dd>
                    {cafe.hours.label[locale]} · {cafe.hours.value}
                  </dd>
                </div>
                <div className="fsec__row">
                  <dt className="label">{t('common.phone')}</dt>
                  <dd>
                    <a href={cafe.phone.href} data-cursor="link">
                      {cafe.phone.display}
                    </a>
                  </dd>
                </div>
                <div className="fsec__row">
                  <dt className="label">{t('common.instagram')}</dt>
                  <dd>
                    <a
                      href={cafe.instagram.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                    >
                      {cafe.instagram.handle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="fsec__body">
            {sent ? (
              <ReadyPanel composed={composed} onEdit={() => setSent(false)} />
            ) : (
              <form className="frm" onSubmit={submit} noValidate>
                <SelectField
                  id="cr-role"
                  label={t('careers.form.role')}
                  value={role}
                  onChange={(next) => setRole(next)}
                  options={roles}
                  placeholder={t('careers.form.rolePlaceholder')}
                  error={errors.role ? t(errors.role) : undefined}
                />
                <TextField
                  id="cr-name"
                  label={t('careers.form.name')}
                  value={name}
                  onChange={setName}
                  placeholder={t('careers.form.namePlaceholder')}
                  error={errors.name ? t(errors.name) : undefined}
                  autoComplete="name"
                />
                <TextField
                  id="cr-contact"
                  label={t('careers.form.contact')}
                  value={contact}
                  onChange={setContact}
                  placeholder={t('careers.form.contactPlaceholder')}
                  error={errors.contact ? t(errors.contact) : undefined}
                  wide
                />
                <TextArea
                  id="cr-about"
                  label={t('careers.form.about')}
                  value={about}
                  onChange={setAbout}
                  placeholder={t('careers.form.aboutPlaceholder')}
                  rows={5}
                />

                <div className="frm__actions">
                  <button type="submit" className="btn btn--molten" data-cursor="link">
                    {t('careers.form.submit')}
                    <span className="btn__arrow">→</span>
                  </button>
                  <p className="frm__legal">{t('form.ready.note')}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

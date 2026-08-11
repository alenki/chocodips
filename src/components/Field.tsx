import type { ReactNode } from 'react';
import './Field.css';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  wide?: boolean;
}

export function Field({ id, label, error, hint, children, wide }: FieldShellProps) {
  return (
    <div className={`fld${wide ? ' fld--wide' : ''}${error ? ' fld--err' : ''}`}>
      <label className="label fld__label" htmlFor={id}>
        {label}
        {hint ? <span className="fld__hint">{hint}</span> : null}
      </label>
      {children}
      <span className="fld__msg" role={error ? 'alert' : undefined}>
        {error ?? ''}
      </span>
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  wide?: boolean;
  autoComplete?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  wide,
  autoComplete,
}: TextFieldProps) {
  return (
    <Field id={id} label={label} error={error} hint={hint} wide={wide}>
      <input
        id={id}
        className="fld__input"
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
    </Field>
  );
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 5,
}: Omit<TextFieldProps, 'wide' | 'autoComplete'> & { rows?: number }) {
  return (
    <Field id={id} label={label} error={error} wide>
      <textarea
        id={id}
        className="fld__input fld__input--area"
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
    </Field>
  );
}

/**
 * Options carry a stable `value` and a translated `label`, so switching locale
 * re-labels the chosen option instead of orphaning the selection.
 */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
}) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="fld__selwrap">
        <select
          id={id}
          className="fld__input fld__input--sel"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="fld__chev" aria-hidden="true">
          ↓
        </span>
      </div>
    </Field>
  );
}

const SCORES = [1, 2, 3, 4, 5];

/**
 * Five chocolate drops instead of stars. Implements the radiogroup keyboard
 * contract: one tab stop (roving tabindex), arrows/Home/End to move.
 */
export function DropRating({
  label,
  hint,
  scoreLabel,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  /** Builds the accessible name of each drop, e.g. "3 из 5". */
  scoreLabel: (score: number) => string;
  value: number;
  onChange: (next: number) => void;
}) {
  /* With nothing chosen yet the first drop carries the tab stop. */
  const focusIndex = value > 0 ? value - 1 : 0;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const current = value > 0 ? value : 1;
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(current + 1, 5);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(current - 1, 1);
    if (event.key === 'Home') next = 1;
    if (event.key === 'End') next = 5;

    onChange(next);
    const group = event.currentTarget;
    group.querySelectorAll<HTMLButtonElement>('.rate__drop')[next - 1]?.focus();
  };

  return (
    <div className="fld fld--rating">
      <span className="label fld__label" id="rate-label">
        {label}
        <span className="fld__hint">{hint}</span>
      </span>
      <div className="rate" role="radiogroup" aria-labelledby="rate-label" onKeyDown={onKeyDown}>
        {SCORES.map((score, i) => (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={scoreLabel(score)}
            tabIndex={i === focusIndex ? 0 : -1}
            className={`rate__drop${score <= value ? ' is-on' : ''}`}
            onClick={() => onChange(value === score ? 0 : score)}
          >
            <svg viewBox="0 0 24 30" aria-hidden="true">
              <path d="M12 0.6c0 0 9.4 11.5 9.4 17.8A9.4 9.4 0 0 1 12 29.4a9.4 9.4 0 0 1-9.4-11C2.6 12.1 12 0.6 12 0.6z" />
            </svg>
          </button>
        ))}
      </div>
      <span className="fld__msg" />
    </div>
  );
}

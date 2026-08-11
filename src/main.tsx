import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import './styles/tokens.css';
import './styles/base.css';
import { LocaleProvider } from './i18n/LocaleProvider';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes every motion component honour the OS setting,
        including the ones that do not call useReducedMotion themselves. */}
    <MotionConfig reducedMotion="user">
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </MotionConfig>
  </StrictMode>,
);

import { useEffect, useRef, useState } from 'react';
import VitucoHeader from './components/VitucoHeader';
import InstructionText from './components/InstructionText';
import EmojiStage from './components/EmojiStage';
import FollowReveal from './components/FollowReveal';
import { TEXTS } from './i18n';
import { CONTINUOUS_TOUCH } from './config';

const REVEAL_DELAY_MS = 2000;
const FINAL_STEP = 4;

const detectLang = () => {
  try {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    // sin almacenamiento: seguimos con el idioma del navegador
  }
  return (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
};

export default function Home() {
  const [lang, setLang] = useState(detectLang);
  const [step, setStep] = useState(0);
  const [lifted, setLifted] = useState(false);
  const stepRef = useRef(0);
  const revealed = step > FINAL_STEP;
  const base = TEXTS[lang];
  const t = {
    ...base,
    steps: CONTINUOUS_TOUCH ? base.steps : base.stepsTap,
    stageLabel: CONTINUOUS_TOUCH ? base.stageLabel : base.stageLabelTap,
  };

  const go = (next) => {
    stepRef.current = next;
    setStep(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('lang', lang);
    } catch {
      // ignorar
    }
  }, [lang]);

  useEffect(() => {
    if (step !== FINAL_STEP) return undefined;
    const timer = window.setTimeout(() => go(FINAL_STEP + 1), REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  // El dedo toca la pantalla
  const handleDown = () => {
    const current = stepRef.current;
    if (CONTINUOUS_TOUCH) {
      if (current === 0) {
        setLifted(false);
        go(1);
      }
    } else if (current < FINAL_STEP) {
      // Modo "levantar y tocar": cada toque avanza un paso
      go(current + 1);
    }
  };

  // El dedo se ha desplazado lo suficiente sin levantarse
  const handleMove = () => {
    if (!CONTINUOUS_TOUCH) return;
    const current = stepRef.current;
    if (current >= 1 && current < FINAL_STEP) go(current + 1);
  };

  // El dedo se ha levantado antes de terminar: se reinicia
  const handleLift = () => {
    if (!CONTINUOUS_TOUCH) return;
    const current = stepRef.current;
    if (current >= 1 && current < FINAL_STEP) {
      go(0);
      setLifted(true);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-background font-body text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C5A059]/10 blur-[90px]" />
      </div>

      <div className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-30 flex overflow-hidden rounded-full border border-white/15 text-[11px] font-semibold tracking-widest">
        {['es', 'en'].map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`px-3 py-1.5 uppercase transition-colors ${
              lang === code ? 'bg-[#C5A059] text-[#050505]' : 'text-[#F5F5F7]/70'
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <VitucoHeader />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-1">
        <div className="flex min-h-[8.5rem] w-full items-center justify-center">
          {revealed ? (
            <FollowReveal t={t} />
          ) : (
            <InstructionText step={step} lifted={lifted} t={t} />
          )}
        </div>
        <EmojiStage
          revealed={revealed}
          t={t}
          onDown={handleDown}
          onMove={handleMove}
          onLift={handleLift}
        />
      </main>
    </div>
  );
}

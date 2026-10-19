import { useEffect, useState } from 'react';
import VitucoHeader from './components/VitucoHeader';
import InstructionText from './components/InstructionText';
import EmojiStage from './components/EmojiStage';
import FollowReveal from './components/FollowReveal';

const REVEAL_DELAY_MS = 2000;
const FINAL_STEP = 4;

export default function Home() {
  const [step, setStep] = useState(0);
  const revealed = step > FINAL_STEP;

  useEffect(() => {
    if (step !== FINAL_STEP) return undefined;
    const timer = window.setTimeout(() => setStep(FINAL_STEP + 1), REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  const handleAdvance = () => {
    setStep((current) => (current < FINAL_STEP ? current + 1 : current));
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-background font-body text-[#F5F5F7]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C5A059]/10 blur-[90px]" />
      </div>

      <VitucoHeader />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-1">
        <InstructionText step={step} />
        <EmojiStage revealed={revealed} onAdvance={handleAdvance} />
        {revealed && <FollowReveal />}
      </main>
    </div>
  );
}
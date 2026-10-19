
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Img from './Img';

const BASE = import.meta.env.BASE_URL;
const GRID_LOCAL = `${BASE}images/grid.jpeg`;
const FINAL_LOCAL = `${BASE}images/final.jpeg`;
const GRID_REMOTE =
  'https://media.base44.com/images/public/user_6a1994aa166a97b25e28fdcf/665ca863f_3fbcf59e-21a2-42d2-a692-b7f4353fe082.jpeg';
const FINAL_REMOTE =
  'https://media.base44.com/images/public/user_6a1994aa166a97b25e28fdcf/d0bb91d12_A140EC49-2345-4CE4-9B12-5A2A9C2C862F.jpeg';

const RIPPLE_SIZE = 110;
const ease = [0.22, 1, 0.36, 1];

export default function EmojiStage({ revealed, onAdvance }) {
  const [ripples, setRipples] = useState([]);
  const [pulse, setPulse] = useState(0);

  const registerTouch = (clientX, clientY, element) => {
    const rect = element.getBoundingClientRect();
    const id = `${Date.now()}-${pulse}`;
    setRipples((current) => [...current, { id, x: clientX - rect.left, y: clientY - rect.top }]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== id)), 850);
    setPulse((value) => value + 1);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    onAdvance();
  };

  const handlePointerDown = (event) => {
    if (revealed) return;
    registerTouch(event.clientX, event.clientY, event.currentTarget);
  };

  const handleKeyDown = (event) => {
    if (revealed || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    registerTouch(rect.left + rect.width / 2, rect.top + rect.height / 2, event.currentTarget);
  };

  return (
    <div className="vituco-stage relative -mx-6" style={{ width: 'min(100vw, 60dvh, 560px)' }}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Imagen del truco: toca para continuar"
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        onContextMenu={(event) => event.preventDefault()}
        className="relative aspect-square w-full cursor-pointer touch-none select-none overflow-hidden rounded-[20px] bg-black outline-none"
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 1.08 : 1 }}
          transition={{ duration: 0.9, ease }}
        >
          <Img
            src={GRID_LOCAL}
            fallback={GRID_REMOTE}
            alt="Cuadrícula de emojis del truco"
            fit="cover"
            className="block h-full w-full"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 1.16 }}
          transition={{ duration: 1.15, ease, delay: revealed ? 0.25 : 0 }}
        >
          <Img
            src={FINAL_LOCAL}
            fallback={FINAL_REMOTE}
            alt="Emoji final: chistera de mago con varita y estrellas"
            fit="cover"
            position="50% 30%"
            className="block h-full w-full"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-[#FFE9B0]/50 to-transparent"
          initial={false}
          animate={{ opacity: revealed ? [0, 0.85, 0] : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="pointer-events-none absolute rounded-full bg-white/25"
              style={{
                left: ripple.x - RIPPLE_SIZE / 2,
                top: ripple.y - RIPPLE_SIZE / 2,
                height: RIPPLE_SIZE,
                width: RIPPLE_SIZE,
              }}
              initial={{ opacity: 0.75, scale: 0 }}
              animate={{ opacity: 0, scale: 1.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {pulse > 0 && !revealed && (
          <motion.span
            key={pulse}
            className="pointer-events-none absolute inset-0 rounded-[20px] border-2 border-[#C5A059]/70"
            initial={{ opacity: 0.85, scale: 1 }}
            animate={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}

        {!revealed && (
          <span className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.06]" />
        )}
      </div>
    </div>
  );
}
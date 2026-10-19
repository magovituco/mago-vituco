import { AnimatePresence, motion } from 'framer-motion';

const STEPS = {
  0: {
    lead: 'Fíjate en uno de los emojis y pon tu dedo sobre él, sin levantarlo.',
  },
  1: {
    lead: 'Muy bien. Ahora cambia el dedo al emoji ',
    accent: 'rojo',
    tail: ' más cercano.',
    color: '#FF5A5F',
  },
  2: {
    lead: 'Continuamos. Ahora pasa el dedo a la imagen ',
    accent: 'morada',
    tail: ' más cercana.',
    color: '#B983FF',
  },
  3: {
    lead: 'Genial. Un último paso: ahora toca el emoji ',
    accent: 'amarillo',
    tail: ' más cercano.',
    color: '#FFD166',
  },
};

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
const entrance = { opacity: 0, y: 14, filter: 'blur(6px)' };
const settled = { opacity: 1, y: 0, filter: 'blur(0px)' };
const leave = { opacity: 0, y: -14, filter: 'blur(6px)' };

export default function InstructionText({ step }) {
  const content = STEPS[step];
  const color = content?.color;
  const isPreparing = step === 4;

  return (
    <div className="relative flex min-h-[5.75rem] w-full items-center justify-center">
      {color && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          exit={{ opacity: 0 }}
          transition={transition}
        />
      )}

      <div aria-live="polite" className="relative w-full text-center">
        <AnimatePresence mode="wait">
          {isPreparing ? (
            <motion.p
              key="prepare"
              initial={entrance}
              animate={settled}
              exit={leave}
              transition={transition}
              className="vituco-shimmer-text font-display text-[34px] font-light leading-tight tracking-wide"
            >
              ¿Estás preparado?
            </motion.p>
          ) : content ? (
            <motion.p
              key={step}
              initial={entrance}
              animate={settled}
              exit={leave}
              transition={transition}
              className="text-[19px] font-light leading-relaxed text-[#F2F2F5]"
            >
              {content.lead}
              {content.accent && (
                <span
                  className="font-semibold"
                  style={{ color, textShadow: `0 0 24px ${color}66` }}
                >
                  {content.accent}
                </span>
              )}
              {content.tail}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
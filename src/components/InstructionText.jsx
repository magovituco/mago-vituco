import { AnimatePresence, motion } from 'framer-motion';

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
const entrance = { opacity: 0, y: 14, filter: 'blur(6px)' };
const settled = { opacity: 1, y: 0, filter: 'blur(0px)' };
const leave = { opacity: 0, y: -14, filter: 'blur(6px)' };

export default function InstructionText({ step, lifted, t }) {
  const content = step === 0 && lifted ? { lead: t.lifted } : t.steps[step];
  const color = content?.color;
  const isPreparing = step === 4;

  return (
    <div className="relative flex min-h-[7.5rem] w-full items-center justify-center">
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
              {t.ready}
            </motion.p>
          ) : content ? (
            <motion.p
              key={`${step}-${lifted ? 'l' : 'n'}`}
              initial={entrance}
              animate={settled}
              exit={leave}
              transition={transition}
              className="text-[19px] font-light leading-relaxed text-[#F2F2F5]"
            >
              {content.label && (
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
                  {content.label}
                </span>
              )}
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
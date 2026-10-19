import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/magovituco';

export default function FollowReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col items-center gap-5 text-center"
    >
      <div className="space-y-1.5">
        <p className="font-display text-[27px] font-light leading-tight tracking-wide text-[#C5A059]">
          Esta es tu elección.
        </p>
        <p className="text-[15px] font-light text-[#F5F5F7]/65">
          Si te ha gustado, sígueme para más magias.
        </p>
      </div>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 rounded-full border border-[#C5A059]/60 bg-[#C5A059]/10 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F0D9A5] transition-all duration-300 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#050505] active:scale-[0.98]"
      >
        <Instagram className="h-4 w-4" strokeWidth={1.75} />
        Seguir
      </a>
    </motion.div>
  );
}
import Img from './Img';

const BASE = import.meta.env.BASE_URL;
const LOGO_LOCAL = `${BASE}images/logo.png`;
const LOGO_REMOTE =
  'https://media.base44.com/images/public/user_6a1994aa166a97b25e28fdcf/7127b5798_IMG_9502.png';

export default function VitucoHeader() {
  return (
    <header className="relative z-20 flex shrink-0 flex-col items-center px-4 pb-3 pt-[max(2.75rem,calc(env(safe-area-inset-top)+2rem))]">
      <div className="relative aspect-[3282/579] w-[min(92vw,460px)]">
        <Img
          src={LOGO_LOCAL}
          fallback={LOGO_REMOTE}
          alt="Mago Vituco Productions"
          fit="contain"
          className="block h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-10px] left-1/2 h-12 w-64 -translate-x-1/2 rounded-full bg-[#C5A059]/15 blur-2xl" />
    </header>
  );
}

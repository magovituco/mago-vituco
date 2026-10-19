import Img from './Img';

const BASE = import.meta.env.BASE_URL;
const LOGO_LOCAL = `${BASE}images/logo.png`;
const LOGO_REMOTE =
  'https://media.base44.com/images/public/user_6a1994aa166a97b25e28fdcf/7127b5798_IMG_9502.png';

export default function VitucoHeader() {
  return (
    <header className="relative z-20 flex shrink-0 flex-col items-center pb-2 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="relative h-12 w-[min(58vw,210px)] sm:h-14">
        <Img
          src={LOGO_LOCAL}
          fallback={LOGO_REMOTE}
          alt="Mago Vituco Productions"
          fit="contain"
          className="block h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-10px] left-1/2 h-10 w-44 -translate-x-1/2 rounded-full bg-[#C5A059]/15 blur-2xl" />
    </header>
  );
}

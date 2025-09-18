import Link from "next/link";
import DebugPanel from "./DebugPanel";

type NavbarProps = {
  displayShorts: boolean;
  displayCalcButton: boolean;
  displayTipButton: boolean;
};

export default function Navbar({
  displayShorts,
  displayCalcButton,
  displayTipButton,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-8 w-8 rounded-2xl bg-violet-600/90 shadow-md" />
          <span>FinaCheck</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {displayShorts && (
            <>
              <Link href="#comment-ca-marche" className="hover:opacity-80">
                Comment ça marche
              </Link>
              <Link href="#faq" className="hover:opacity-80">
                FAQ
              </Link>
            </>
          )}
          {displayTipButton && (
            <Link href="/tip" className="hover:opacity-80">
              Soutenir
            </Link>
          )}
        </nav>
        {displayCalcButton && (
          <div className="flex items-center gap-2">
            <Link
              href="/calc"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-slate-300/60 dark:ring-slate-700 hover:shadow transition"
            >
              Lancer le calcul
            </Link>
          </div>
        )}
        
        {/* Panel de debug dans la navbar */}
        <DebugPanel />
      </div>
    </header>
  );
}

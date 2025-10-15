import type { PropsWithChildren } from 'react';
import Footer from './footer';
import ThemeChanger from './theme-changer';

type LayoutProps = PropsWithChildren<unknown>;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-50 transition-colors duration-700 dark:bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_220deg_at_15%_10%,rgba(56,189,248,0.18),transparent_60%)] dark:bg-[conic-gradient(from_250deg_at_85%_15%,rgba(129,140,248,0.18),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(14,116,144,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_15%_110%,rgba(30,64,175,0.12),transparent_60%)]" />
      </div>
      <div className="relative flex min-h-screen flex-col selection:bg-blue-500/40 selection:text-blue-950 dark:selection:bg-cyan-400/40 dark:selection:text-slate-900">
        <main className="flex-1">{children}</main>
        <Footer />
        <ThemeChanger />
      </div>
    </div>
  );
}

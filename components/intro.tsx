import { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  '编译故事与像素...',
  '向元宇宙流式传输沙漠信号...',
  '优化好奇心循环...',
  '在边缘部署想法...',
];

export default function Intro() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setStatusIndex((index) => (index + 1) % STATUS_MESSAGES.length),
      4200
    );

    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative mt-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/75 px-10 py-14 shadow-[0_55px_120px_-45px_rgba(30,64,175,0.45)] backdrop-blur-2xl sm:px-8 sm:py-12 dark:border-white/5 dark:bg-slate-950/60 dark:shadow-[0_45px_100px_-40px_rgba(15,118,110,0.55)]">
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_5%,rgba(56,189,248,0.4),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_25%,rgba(129,140,248,0.3),transparent_55%)]" />
          <div className="absolute -left-24 top-1/4 h-[130%] w-1/2 rotate-12 bg-gradient-to-br from-sky-400/40 via-transparent to-indigo-500/30 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-8">
            <span
              aria-live="polite"
              className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-1.5 font-mono text-[11px] tracking-[0.25em] text-slate-500 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-slate-200"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              {STATUS_MESSAGES[statusIndex]}
            </span>

            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-tight text-slate-900 sm:text-4xl dark:text-white">
                欢迎来到真实的荒漠 :)
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                我是一个把技术栈当成探索工具的程序员，这里记录我对虚实交界的好奇、实验和故事。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

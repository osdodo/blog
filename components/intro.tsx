import { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  '编译故事与像素...',
  '向元宇宙流式传输沙漠信号...',
  '优化好奇心循环...',
  '在边缘部署想法...',
];

const BADGES = ['Rust', 'TypeScript', 'Python'];

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
    <section className="relative mt-4 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 px-14 py-14 shadow-[0_45px_100px_-40px_rgba(30,64,175,0.45)] sm:px-6 sm:py-10 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-[0_45px_90px_-35px_rgba(15,118,110,0.5)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(129,140,248,0.25),transparent_55%)]" />
        </div>
        <div className="relative flex flex-col items-start gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
              欢迎来到真实的荒漠 :)
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 sm:text-base dark:text-slate-300">
              这里把代码、设计与生活点子揉成一场沙漠风暴。每一篇文章都是一次技术冒险，也是一小段旅程记录。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-semibold tracking-widest text-slate-500 sm:text-[11px] dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex items-center font-mono text-xs text-slate-500 dark:text-slate-200">
            {STATUS_MESSAGES[statusIndex]}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { PostSummary } from '../lib/types';
import Link from 'next/link';
import CoverImage from './cover-image';

interface PostPreviewProps {
  posts: PostSummary[];
}

export default function PostPreview({ posts }: PostPreviewProps) {
  return (
    <section className="relative mt-16 sm:mt-12">
      <div className="flex flex-col gap-8">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="group relative overflow-hidden rounded-2xl bg-white/60 px-9 py-8 shadow-[0_40px_90px_-45px_rgba(30,64,175,0.35)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_35px_95px_-45px_rgba(56,189,248,0.45)] sm:px-6 sm:py-7 dark:bg-slate-950/60 dark:shadow-[0_40px_90px_-50px_rgba(20,184,166,0.45)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.22),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_100%_0%,rgba(45,212,191,0.28),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/35 to-transparent dark:from-white/5 dark:via-white/0" />
            <div className="relative flex gap-7 sm:flex-col">
              <div className="flex flex-col justify-center items-center gap-4 text-center text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                <span className="font-semibold text-slate-500 dark:text-slate-300">
                  {post.date}
                </span>
              </div>
              <div className="flex-1 space-y-5">
                <div className="flex flex-col gap-3">
                  <Link
                    as={`/posts/${post.slug}`}
                    href="/posts/[slug]"
                    className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900 transition-colors duration-300 hover:text-blue-600 sm:text-xl dark:text-white dark:hover:text-cyan-300"
                  >
                    {post.title}
                  </Link>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    {post.summary}
                  </p>
                </div>
                {post.coverImage ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-700/60 dark:bg-slate-900/60">
                    <CoverImage
                      className="rounded-2xl brightness-[0.98] transition duration-500 group-hover:scale-[1.02] group-hover:brightness-105"
                      title={post.title}
                      src={post.coverImage}
                      slug={post.slug}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { PropsWithChildren } from 'react';

type PostTitleProps = PropsWithChildren<unknown>;

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <h1 className="mt-10 mb-5 text-3xl font-bold text-center sm:text-2xl">
      {children}
    </h1>
  );
}

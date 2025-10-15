import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<unknown>;

export default function Container({ children }: ContainerProps) {
  return (
    <div className="container relative mx-auto max-w-5xl px-8 py-20 sm:px-4 sm:py-12">
      {children}
    </div>
  );
}

import { useFirstViewPortEntry } from '@/shared/hooks/useFirstViewPortEntry';
import React, { Suspense, useRef, ReactNode } from 'react';

interface RenderOnViewportEntryProps {
  children: ReactNode;
  threshold?: number; // значение по умолчанию для Intersection Observer
  root?: Element | null; // значение по умолчанию для Intersection Observer
  rootMargin?: string; // значение по умолчанию для Intersection Observer
  [key: string]: any; // для остальных свойств div
}

const RenderOnViewportEntry = ({
  children,
  threshold = 0,
  root = null,
  rootMargin = '0px 0px 0px 0px',
  ...wrapperDivProps
}: RenderOnViewportEntryProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useFirstViewPortEntry(ref, { threshold, root, rootMargin });

  return (
    <div {...wrapperDivProps} ref={ref}>
      {entered ? (
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      ) : null}
    </div>
  );
};

export default RenderOnViewportEntry;

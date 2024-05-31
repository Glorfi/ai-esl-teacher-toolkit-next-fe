import { useEffect, useRef, useState } from 'react';

export const useFirstViewPortEntry = (ref: any, observerOptions: any) => {
  const [entered, setEntered] = useState<boolean>(false);
  const observer = useRef(
    new IntersectionObserver(([entry]) => setEntered(entry.isIntersecting))
  );

  useEffect(() => {
    const element = ref.current;
    const ob = observer.current;
    if (entered) {
      ob.disconnect();
      return;
    }
    if (element && !entered) ob.observe(element);
    return () => ob.disconnect();
  }, [entered, ref]);

  return entered;
};

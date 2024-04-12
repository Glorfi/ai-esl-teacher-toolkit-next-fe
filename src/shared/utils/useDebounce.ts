import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const doubounceHandler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(doubounceHandler);
  }, [value, delay]);
  return debouncedValue;
};

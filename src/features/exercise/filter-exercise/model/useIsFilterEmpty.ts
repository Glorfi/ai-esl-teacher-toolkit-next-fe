import { useAppSelector } from '@/shared/hooks/hooks';
import { useEffect, useState } from 'react';

export const useIsFilterEmpty = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const filterOptions = useAppSelector((state) => state.filterOptions);
  // const isEmpty = Object.values(filterOptions).every(
  //   value =>
  //     (Array.isArray(value) && value.length === 0) ||
  //     (typeof value === 'string' && value.trim() === '')
  // );
  useEffect(() => {
    setIsEmpty(
      Object.values(filterOptions).every(
        (value) =>
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'string' && value.trim() === '')
      )
    );
  }, [filterOptions]);

  return isEmpty;
};

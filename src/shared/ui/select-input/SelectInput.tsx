import { Input, InputProps, Select, SelectProps, background } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface SelectInputProps extends SelectProps {
  isSuccess?: boolean;
  children: React.ReactNode
}

export const SelectInput = ({
  isSuccess,
  children,
  ...props
}: SelectInputProps): JSX.Element => {
  const successStyles = useMemo(
    () => ({
      background: 'greenOpacity.50',
      borderColor: 'greenOpacity.base',
      _focus: {
        background: 'greenOpacity.50',
        borderColor: 'greenOpacity.base',
      },
    }),
    []
  );

  return (
    <Select {...props} sx={isSuccess ? successStyles : {}}>
      {children}
    </Select>
  );
};

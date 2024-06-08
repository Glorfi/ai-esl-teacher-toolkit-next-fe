import { Input, InputProps, background } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface TextInputProps extends InputProps {
  isSuccess?: boolean;
}

export const TextInput = ({
  isSuccess,
  ...props
}: TextInputProps): JSX.Element => {
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

  return <Input {...props} sx={isSuccess ? successStyles : {}} />;
};

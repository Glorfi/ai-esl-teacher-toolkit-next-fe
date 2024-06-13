import { Input, InputProps, Text, TextProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface TextInputProps extends InputProps {
  isSuccess?: boolean;
  errorMessage?: string;
  textProps?: TextProps;
}

export const TextInput = ({
  isSuccess,
  errorMessage,
  textProps,
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

  return (
    <>
      <Input {...props} sx={isSuccess ? successStyles : {}} />
      {errorMessage && (
        <Text
          fontSize="10px"
          color="error.base"
          w={'100%'}
          minH={'15px'}
          {...textProps}
        >
          {props.isInvalid ? errorMessage : null}
        </Text>
      )}
    </>
  );
};

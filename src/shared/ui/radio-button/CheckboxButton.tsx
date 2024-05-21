import { Box, Flex, chakra, useCheckbox, Text } from '@chakra-ui/react';

export const CheckboxButton = (props: any): JSX.Element => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      border="1px solid"
      borderColor="background"
      backgroundColor={state.isChecked ? 'background' : 'transparent'}
      fontWeight={'medium'}
      maxH={'24px'}
      //rounded="lg"
      fontFamily={'alt'}
      padding={'4px 8px'}
      cursor="pointer"
      {...htmlProps}
      borderRadius={6}
    >
      <input {...getInputProps()} hidden />

      <Text
        color={state.isChecked ? 'primary' : 'background'}
        {...getLabelProps()}
        fontSize={'12px'}
        fontWeight={'medium'}
      >
        {props.title}
      </Text>
    </chakra.label>
  );
};

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
      rounded="lg"
      padding={'4px 8px'}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />

      <Text
        color={state.isChecked ? 'primary' : 'background'}
        {...getLabelProps()}
        fontSize={'12px'}
        fontWeight={'bold'}
      >
        {props.title}
      </Text>
    </chakra.label>
  );
};

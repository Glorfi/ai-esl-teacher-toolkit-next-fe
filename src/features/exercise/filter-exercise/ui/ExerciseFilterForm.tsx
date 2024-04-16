import { VStack, Text } from '@chakra-ui/react';

export const ExerciseFilterForm = (): JSX.Element => {
  return (
    <VStack flexGrow={1} alignItems={'flex-start'} w={'100%'}>
      <Text
        fontSize={'14px'}
        color={'background'}
        fontWeight={'medium'}
        textAlign={'left'}
        w={'100%'}
        padding={'0 16px'}
      >
        Filter Exercise
      </Text>
    </VStack>
  );
};

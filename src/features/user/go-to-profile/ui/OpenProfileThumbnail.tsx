import { useAppSelector } from '@/app/lib/hooks/hooks';
import { HStack, Text } from '@chakra-ui/react';

export const OpenProfileThumbnail = (): JSX.Element => {
  const userData = useAppSelector((state) => state.user);
  return (
    <HStack
      w={'100%'}
      as={'article'}
      justifyContent={'space-between'}
      minH={'max-content'}
      padding={'8px 12px 8px 16px'}
      _hover={{ backgroundColor: 'whiteOpacity.50' }}
      cursor={'pointer'}
      borderRadius={'0.375rem'}
      mt={'auto'}
    >
      <Text fontSize={'16px'} color={'background'} fontWeight={'semibold'}>
        {userData?.email}
      </Text>
    </HStack>
  );
};

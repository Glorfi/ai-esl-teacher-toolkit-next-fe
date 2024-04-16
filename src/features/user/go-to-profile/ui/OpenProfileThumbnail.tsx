import { API_PATH, APP_PATHS } from '@/shared';
import { useAppSelector } from '@/shared/hooks/hooks';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';

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
      <IconButton
        as={Link}
        aria-label="library"
        size={'sm'}
        variant={'ghost'}
        colorScheme="whiteOpacity"
        isRound
        icon={<FaBookOpen color="background  " />}
        href={APP_PATHS.DASHBOARD_LIBRARY}
      />
    </HStack>
  );
};

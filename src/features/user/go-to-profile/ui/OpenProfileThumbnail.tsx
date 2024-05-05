import { API_PATH, APP_PATHS } from '@/shared';
import { useAppSelector } from '@/shared/hooks/hooks';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';

export const OpenProfileThumbnail = (): JSX.Element => {
  const userData = useAppSelector((state) => state.user);
  return (
    <HStack
      w={'100%'}
      as={Link}
      // justifyContent={'space-between'}
      href={APP_PATHS.DASHBOARD_PROFILE}
      minH={'max-content'}
      padding={'8px 12px '}
      _hover={{ backgroundColor: 'whiteOpacity.100' }}
      cursor={'pointer'}
      borderRadius={'0.375rem'}
      mt={'auto'}
    >
      <Avatar size={'xs'} bgColor={'whiteOpacity.100'} />
      <Text color={'background'} fontSize={'sm'} fontWeight={'semibold'}>
        {userData?.email}
      </Text>
    </HStack>
  );
};

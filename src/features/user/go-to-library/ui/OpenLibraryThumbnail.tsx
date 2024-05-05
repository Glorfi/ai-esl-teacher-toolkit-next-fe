import { API_PATH, APP_PATHS } from '@/shared';
import { useAppSelector } from '@/shared/hooks/hooks';
import { Avatar, Box, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';

export const OpenLibraryThumbnail = (): JSX.Element => {
  const userData = useAppSelector((state) => state.user);
  return (
    <HStack
      w={'100%'}
      as={Link}
      // justifyContent={'space-between'}
      href={APP_PATHS.DASHBOARD_LIBRARY}
      minH={'max-content'}
      padding={'8px 12px '}
      _hover={{ backgroundColor: 'whiteOpacity.100' }}
      cursor={'pointer'}
      borderRadius={'0.375rem'}
      mt={'auto'}
    >
      {/* <IconButton
        aria-label="lib"
        as={FaBookOpen}
        color="background"
        isRound
        size={'xs'}
        variant={'unstyled'}
        bgColor={'whiteOpacity.100'}
      /> */}
      <Box
        w={'24px'}
        h={'24px'}
        bgColor={'whiteOpacity.100'}
        borderRadius={'full'}
        p={'6.5px 5px'}
        display={'flex'}
        alignItems={'center'}
      >
        <Icon
          as={FaBookOpen}
          boxSize={'14px'}
          color={'background'}

          // p={'6.5px 5px'}
        />
      </Box>
      <Text color={'background'} fontSize={'sm'} fontWeight={'semibold'}>
        Exercises
      </Text>
    </HStack>
  );
};

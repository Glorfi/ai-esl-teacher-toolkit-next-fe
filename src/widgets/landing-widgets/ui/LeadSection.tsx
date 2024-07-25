import { APP_PATHS } from '@/shared';
import {
  VStack,
  ButtonGroup,
  Button,
  Link,
  Text,
  Box,
  Stack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import leadImage from '../../../../public/leadImage.png';
import leadImageMobile from '../../../../public/leadImageMobile.png';
import { useRef } from 'react';
import { useAppSelector } from '@/shared/hooks/hooks';

export const LeadSection = (): JSX.Element => {
  const userData = useAppSelector((state) => state.user);

  return (
    <VStack
      id="LeadSection"
      as={'section'}
      gap={0}
      //minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      mt={['64px', '104px']}
      w={'100%'}
      scrollMarginTop={'94px'}
    >
      <Text
        as="h1"
        color={'primary.base'}
        fontSize={['32px', '32px', '64px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        ESL Teacher ToolKit is your AI assistant for creating exercises
      </Text>
      <Text
        mt={'16px'}
        as="h3"
        color={'primary.base'}
        fontSize={['md', '20px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Save time, enhance lesson quality, and engage your students with custom,
        personalized assignments.
      </Text>

      <Link
        as={NextLink}
        href={userData ? APP_PATHS.DASHBOARD : APP_PATHS.SIGN_UP}
        mt={['24px', '32px']}
      >
        <Button
          variant={'solid'}
          colorScheme="primary"
          rightIcon={<FaArrowRightLong />}
        >
          {userData ? "Go to dashboard" : "Let's start"}
        </Button>
      </Link>
      <Stack w={'100%'} display={['none', 'flex']} alignItems={'center'}>
        <Image
          src={leadImage}
          priority={true}
          alt="app-interface"
          style={{
            marginTop: '48px',
            boxShadow: '0 4px 40px 0 rgba(29, 52, 90, 0.1)',
            borderRadius: '20px',
          }}
        />
      </Stack>
      <Stack w={'100%'} display={['flex', 'none']} alignItems={'center'}>
        <Image
          src={leadImageMobile}
          priority={true}
          alt="app-interface"
          style={{
            marginTop: '32px',
            boxShadow: '0 4px 40px 0 rgba(29, 52, 90, 0.1)',
            borderRadius: '20px',
          }}
        />
      </Stack>
    </VStack>
  );
};

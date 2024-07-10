import { APP_PATHS } from '@/shared';
import { VStack, ButtonGroup, Button, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import leadImage from '../../../../public/leadImage.png';

export const LeadSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      gap={0}
      //minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'104px'}
      w={'100%'}
    >
      <Text
        as="h1"
        color={'primary.base'}
        fontSize={['2xl', '64px']}
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

      <Link as={NextLink} href={APP_PATHS.SIGN_UP} mt={'32px'}>
        <Button
          variant={'solid'}
          colorScheme="primary"
          rightIcon={<FaArrowRightLong />}
        >
          Let's start
        </Button>
      </Link>
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
    </VStack>
  );
};

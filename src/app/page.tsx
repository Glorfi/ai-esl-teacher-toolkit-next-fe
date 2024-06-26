'use client';
import NextLink from 'next/link';
import { VStack, Text, Button, ButtonGroup, Link } from '@chakra-ui/react';
import { Header } from '@/widgets/header';
import { APP_PATHS } from '@/shared';

export default function Home() {
  return (
    <VStack
      minHeight={'100vh'}
      m={'0 auto'}
      maxW={'1200px'}
      padding={['0 20px', '0 20px', '0 20px', '0']}
    >
      {/* <Header /> */}
      <VStack
        gap={0}
        minHeight={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        // mt={'80px'}
        w={'100%'}
      >
        {/* <Text color={'primary.base'} fontSize={'24px'}>
          Welcome to
        </Text> */}
        <Text
          as="h1"
          color={'primary.base'}
          fontSize={['2xl','64px']}
          fontWeight={'bold'}
          //  lineHeight={'80px'}
          textAlign={'center'}
        >
          ESL Teacher ToolKit is your AI assistant for creating exercises
        </Text>
        <Text
          mt={'24px'}
          as="h2"
          color={'primary.base'}
          fontSize={['md','20px']}
          fontWeight={'bold'}
          //  lineHeight={'80px'}
          textAlign={'center'}
        >
          Save time, enhance lesson quality, and inspire your students with new,
          unique assignments.
        </Text>
        <ButtonGroup alignItems={'center'} mt={'46px'}>
          <Link as={NextLink} href={APP_PATHS.SIGN_UP}>
            <Button
              variant={'solid'}
              colorScheme="primary"
              //borderRadius={'40px'}
            >
              Sign up
            </Button>
          </Link>
          <Link as={NextLink} href={APP_PATHS.SIGN_IN}>
            <Button
              variant={'outline'}
              colorScheme="primary"
              //borderRadius={'40px'}
            >
              Log in
            </Button>
          </Link>
        </ButtonGroup>
      </VStack>
    </VStack>
  );
}

'use client';
import { VStack, Text } from '@chakra-ui/react';
import { Header } from '@/widgets/header';

export default function Home() {
  return (
    <VStack
      minHeight={'100vh'}
      m={'0 auto'}
      maxW={'800px'}
      padding={['0 20px', '0 20px', '0 20px', '0']}
    >
      <Header />
      <VStack
        gap={0}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        mt={'80px'}
        w={'100%'}
      >
        <Text color={'primary'} fontSize={'24px'}>
          Welcome to
        </Text>
        <Text
          as="h1"
          color={'primary'}
          fontSize={'80px'}
          fontWeight={'bold'}
          lineHeight={'80px'}
        >
          ESL Teacher ToolKit
        </Text>
      </VStack>
    </VStack>
  );
}

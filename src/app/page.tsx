'use client';

import { VStack } from '@chakra-ui/react';
import { Header } from '@/widgets/header';

import { AdvantagesSection, LeadSection } from '@/widgets/landing-widgets';

export default function Home() {
  return (
    <VStack
      minHeight={'100vh'}
      m={'0 auto'}
      maxW={'1130px'}
      padding={['0 20px', '0 20px', '0 20px', '0']}
    >
      <Header />
      <LeadSection />
      <AdvantagesSection />
    </VStack>
  );
}

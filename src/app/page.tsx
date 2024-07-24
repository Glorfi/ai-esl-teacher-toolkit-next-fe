'use client';

import { VStack } from '@chakra-ui/react';
import { Header, WorkspaceHeader } from '@/widgets/header';

import {
  AdvantagesSection,
  ContactsSection,
  ExerciseTypesSection,
  FaqSection,
  FooterSection,
  HowToStartSection,
  LeadSection,
  NumbersSection,
} from '@/widgets/landing-widgets';
import { MobileMenuMain } from '@/shared';

export default function Home() {
  return (
    <>
      <Header />
      <VStack
        as={'main'}
        minHeight={'100vh'}
        m={'0 auto'}
        maxW={'1130px'}
        padding={['0 26px', '0 26px', '0 26px', '0']}
        scrollBehavior={'smooth'}
        gap={0}
      >
        <LeadSection />
        <AdvantagesSection />
        <HowToStartSection />
        <ExerciseTypesSection />
        <NumbersSection />
        <FaqSection />
        <ContactsSection />
      </VStack>
      <FooterSection />
    </>
  );
}

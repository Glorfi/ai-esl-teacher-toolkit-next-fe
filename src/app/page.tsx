'use client';

import { VStack } from '@chakra-ui/react';
import { Header } from '@/widgets/header';

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

export default function Home() {
  return (
    <>
      <Header />
      <VStack
        as={'main'}
        minHeight={'100vh'}
        m={'0 auto'}
        maxW={'1130px'}
        padding={['0 20px', '0 20px', '0 20px', '0']}
        scrollBehavior={"smooth"}
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

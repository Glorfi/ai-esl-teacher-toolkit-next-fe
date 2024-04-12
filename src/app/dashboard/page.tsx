'use client';
import { GenerateExerciseForm } from '@/features/exercise/generate-exercise/ui/GenerateExerciseForm';
import { VStack } from '@chakra-ui/react';

import { useState } from 'react';

const DashboardPage = (): JSX.Element => {
  return (
    <VStack h={'100vh'} justifyContent={'center'}>
      <GenerateExerciseForm />
    </VStack>
  );
};
export default DashboardPage;

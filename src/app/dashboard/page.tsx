'use client';
import ExerciseForm from '@/components/ExerciseForm';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

import { useState } from 'react';

const DashboardPage = (): JSX.Element => {
  return (
    <VStack h={'100vh'} justifyContent={'center'}>
      <ExerciseForm />
    </VStack>
  );
};
export default DashboardPage;

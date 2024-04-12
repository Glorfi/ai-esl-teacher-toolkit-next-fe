'use client';
import { SharedExerciseWidget } from '@/widgets/exercise';
import { Box } from '@chakra-ui/react';

const SharedExercisePage = (): JSX.Element => {
  return (
    <Box bgColor={'white'} padding={'0 20px'}>
      <SharedExerciseWidget />
    </Box>
  );
};

export default SharedExercisePage;

'use client';

import { APP_PATHS } from '@/shared';
import { Link } from '@chakra-ui/next-js';
import { Skeleton, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { ExerciseContainer } from '@/entities/exercise';
import {
  ExerciseSelectInput,
  ExerciseSentenceInput,
  useGetExerciseByIdQuery,
} from '@/features/exercise';
import { useState } from 'react';

export const SharedExerciseWidget = (): JSX.Element => {
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);

  const {
    data: ex,
    isError,
    isSuccess,
  } = useGetExerciseByIdQuery({ token, id });

  function handleExerciseCard() {
    if (ex && ex.type === 'multipleChoice') {
      return (
        <ExerciseSelectInput
          sentenceList={ex.sentenceList}
          taskDescription={ex.taskDescription}
          isRandomOrderEnabled={ex.isRandomOrderEnabled}
        />
      );
    }
    if (ex && ex.type === 'fillInGaps') {
      return (
        <ExerciseSentenceInput
          sentenceList={ex.sentenceList}
          taskDescription={ex.taskDescription}
          isRandomOrderEnabled={ex.isRandomOrderEnabled}
        />
      );
    }
  }

  return (
    <VStack
      alignItems={'flex-start'}
      w={'100%'}
      justifyContent={'center'}
      maxW={'800px'}
      margin={'auto'}
      mt={'40px'}
    >
      <ExerciseContainer
        exerciseCard={handleExerciseCard()}
        exTitle={ex?.title}
        isError={isError}
        isSuccess={isSuccess}
      />
      <Skeleton isLoaded={isSuccess} alignSelf={'flex-end'}>
        <Text
          fontSize={'12px'}
          alignSelf={'flex-end'}
          color={'highlight.base'}
          fontWeight={'light'}
        >
          Powered by{' '}
          <Link
            href={APP_PATHS.MAIN}
            fontSize={'12px'}
            // color="highlight.base"
            fontWeight={'medium'}
          >
            AI ESL teacher toolkit
          </Link>
        </Text>
      </Skeleton>
    </VStack>
  );
};

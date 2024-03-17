'use client';
import { ExerciseSelectInput } from '@/components/ExerciseSelectInput';
import { ExerciseSentenceInput } from '@/components/ExerciseSentenceInput';
import { APP_PATHS } from '@/constants/AppPaths';
import { useGetExerciseByIdQuery } from '@/store/main-api/queries/getExerciseById';
import { LSHandler } from '@/utils/handleLocalStorage';
import { Link } from '@chakra-ui/next-js';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SharedExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const { data: ex, isError } = useGetExerciseByIdQuery({ token, id });

  useEffect(() => {
    setToken(LSHandler.getJwt());
  }, []);
  return (
    <Box
      //  minH={'100vh'}
      bgColor={'white'}
      padding={'0 20px'}
    >
      <VStack
        alignItems={'flex-start'}
        w={'100%'}
        justifyContent={'center'}
        maxW={'800px'}
        margin={'auto'}
        mt={'40px'}
      >
        {ex?.title ? (
          <Text color={'primary'} fontWeight={'bold'} fontSize={'x-large'}>
            {ex?.title}
          </Text>
        ) : null}
        {isError ? <Text>Ooops! Seems The exercise isn't found</Text> : null}
        {ex?.type === 'fillInGaps' ? (
          <ExerciseSentenceInput
            sentenceList={ex.sentenceList}
            taskDescription={ex.taskDescription}
          />
        ) : null}
        {ex?.type === 'multipleChoice' ? (
          <ExerciseSelectInput
            sentenceList={ex.sentenceList}
            taskDescription={ex.taskDescription}
          />
        ) : null}
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
      </VStack>
    </Box>
  );
};

export default SharedExercisePage;

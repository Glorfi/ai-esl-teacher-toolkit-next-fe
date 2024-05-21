import { Skeleton, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

interface IExerciseCardProps {
  exTitle: string | undefined;
  exerciseCard: JSX.Element | undefined;
  isError: boolean;
  isSuccess: boolean;
}

export const ExerciseContainer = (props: IExerciseCardProps): JSX.Element => {
  const { exerciseCard, isError, isSuccess, exTitle } = props;
  const { id } = useParams();

  return (
    <>
      <Skeleton isLoaded={isSuccess} height={'36px'} minW={'300px'}>
        <Text color={'primary.base'} fontWeight={'bold'} fontSize={'x-large'}>
          {exTitle}
        </Text>
      </Skeleton>
      {isError ? <Text>Ooops! Seems The exercise isn't found</Text> : null}
      <Skeleton isLoaded={isSuccess} height={'100%'} minH={'50px'} w={'100%'}>
        {exerciseCard}
      </Skeleton>
    </>
  );
};

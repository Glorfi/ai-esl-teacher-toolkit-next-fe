'use client';
import { ExerciseLibraryCard, IExercise } from '@/entities/exercise';
import { TopicTag } from '@/entities/topic';
import { getFilteredExerciseList } from '@/features/exercise';
import { useAppSelector } from '@/shared/hooks/hooks';
import { VStack, Text, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const ExerciseUserLibraryWidget = (): JSX.Element => {
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const filterOptions = useAppSelector((state) => state.filterOptions);
  const [filteredExList, setFilteredExList] = useState<IExercise[]>([]);

  useEffect(() => {
    const arr = getFilteredExerciseList(exerciseList, filterOptions);
    arr.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setFilteredExList(arr);
  }, [filterOptions, exerciseList]);
  return (
    <VStack maxW={'800px'} w={'80%'} p={['20px', '20px 0']}>
      <Text w={'100%'} fontSize={'x-large'} fontWeight={'bold'}>
        Your exercises:
      </Text>
      <Grid gridTemplateColumns={'1fr 1fr 1fr'} gap={'8px'} w={'100%'}>
        {/* <ExerciseLibraryCard exersice={filteredExList[0]} /> */}
        {filteredExList.map((item, index) => {
          return (
            <ExerciseLibraryCard
              exersice={item}
              TopicTag={TopicTag}
              key={`exInfoCard ${item._id}`}
            />
          );
        })}
      </Grid>
    </VStack>
  );
};

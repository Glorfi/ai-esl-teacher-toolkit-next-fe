'use client';
import {
  ExerciseLibraryCard,
  IExercise,
  replaceExercise,
} from '@/entities/exercise';
import { TopicTag } from '@/entities/topic';
import {
  DeleteExercisePopUp,
  ShareExercisePopUp,
  getFilteredExerciseList,
  toggleTopic,
} from '@/features/exercise';
import {
  AddTopicMenu,
  useRemoveTopicFromExerciseMutation,
} from '@/features/topic';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { VStack, Text, Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

export const ExerciseUserLibraryWidget = (): JSX.Element => {
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const filterOptions = useAppSelector((state) => state.filterOptions);
  const dispatch = useAppDispatch();
  const [filteredExList, setFilteredExList] = useState<IExercise[]>([]);

  const features = [
    {
      title: 'Share',
      icon: FaRegShareFromSquare,
      modal: ShareExercisePopUp,
    },
    {
      icon: FaRegTrashCan,
      title: 'Delete',
      color: 'error.base',
      modal: DeleteExercisePopUp,
    },
  ];

  const [removeTopic, { data: exWithRemovedTopic }] =
    useRemoveTopicFromExerciseMutation();

  const onTopicFilter = (topicId: string) => {
    dispatch(toggleTopic(topicId));
  };

  useEffect(() => {
    const arr = getFilteredExerciseList(exerciseList, filterOptions);
    arr.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setFilteredExList(arr);
  }, [filterOptions, exerciseList]);

  useEffect(() => {
    if (exWithRemovedTopic) {
      dispatch(replaceExercise(exWithRemovedTopic));
    }
  }, [exWithRemovedTopic]);
  return (
    <VStack maxW={'800px'} w={['100%', '100%', '80%']} p={['0', '20px 0']}>
      <Text w={'100%'} fontSize={'x-large'} fontWeight={'bold'}>
        Your exercises:
      </Text>
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr']}
        gap={'8px'}
        w={'100%'}
      >
        {/* <ExerciseLibraryCard exersice={filteredExList[0]} /> */}
        {filteredExList.map((item, index) => {
          return (
            <ExerciseLibraryCard
              exersice={item}
              TopicTag={TopicTag}
              key={`exInfoCard ${item._id}`}
              menuFeatures={features}
              AddTopicMenu={AddTopicMenu}
              onTopicFilter={onTopicFilter}
            />
          );
        })}
      </Grid>
    </VStack>
  );
};

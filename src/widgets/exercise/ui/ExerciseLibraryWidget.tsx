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
import { VStack, Text, Grid, Icon, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

export const ExerciseUserLibraryWidget = (): JSX.Element => {
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const filterOptions = useAppSelector((state) => state.filterOptions);
  const dispatch = useAppDispatch();
  const [filteredExList, setFilteredExList] = useState<IExercise[]>([]);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const [removeTopic, { data: exWithRemovedTopic }] =
    useRemoveTopicFromExerciseMutation();

  const features = [
    {
      title: 'Share',
      icon:  BiShare,
      modal: ShareExercisePopUp,
    },
    {
      icon: FaRegTrashCan,
      title: 'Delete',
      color: 'error.base',
      modal: DeleteExercisePopUp,
    },
  ];

  // const [removeTopic, { data: exWithRemovedTopic }] =
  //   useRemoveTopicFromExerciseMutation();

  // const onTopicFilter = (topicId: string) => {
  //   dispatch(toggleTopic(topicId));
  // };

  useEffect(() => {
    const arr = getFilteredExerciseList(exerciseList, filterOptions);
    arr.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setFilteredExList(arr);
    setIsRendered(true);
  }, [filterOptions, exerciseList]);

  useEffect(() => {
    if (exWithRemovedTopic) {
      dispatch(replaceExercise(exWithRemovedTopic));
    }
  }, [exWithRemovedTopic]);
  return (
    <VStack
      //  maxW={'800px'}
      w={['100%']}
      padding={['0 36px 0 56px']}
      mt={'80px'}
      // p={['0', '20px 0']}
    >
      <HStack justifyContent={'flex-start'} w={'100%'} alignItems={'baseline'}>
        <Text fontSize={'x-large'} fontWeight={'bold'}>
          Your exercises
        </Text>
        <Text
          color={'graySecondary'}
          fontSize={'xs'}
        >{`${filteredExList.length} exercises`}</Text>
      </HStack>
      <Grid
        //gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr']}
        gridTemplateColumns={'repeat(auto-fill, minmax(275px, 1fr))'}
        gap={'14px'}
        w={'100%'}
      >
        {filteredExList.map((item, index) => {
          return (
            <ExerciseLibraryCard
              exersice={item}
              TopicTag={TopicTag}
              key={`exInfoCard ${item._id}`}
              menuFeatures={features}
              AddTopicMenu={AddTopicMenu}
              // onTopicFilter={onTopicFilter}
              onTopicDelete={removeTopic}
            />
          );
        })}
      </Grid>
      {filteredExList.length === 0 && isRendered && (
        <VStack>
          <Icon
            as={BsExclamationCircle}
            w={'80px'}
            h={'80px'}
            color={'primary.base'}
          />
          <Text>There are no exercises matching your current filters</Text>
          <Text fontWeight={'bold'} fontSize={'x-large'}>
            Please choose other filtering options!
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

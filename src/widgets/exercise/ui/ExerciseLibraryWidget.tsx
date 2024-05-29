'use client';
import {
  ExerciseLibraryCard,
  IExercise,
  replaceExercise,
} from '@/entities/exercise';

import { TopicTag } from '@/entities/topic';
import {
  DeleteExercisePopUp,
  ExerciseFilterBar,
  ShareExercisePopUp,
  SortExerciseDropDown,
  getFilteredExerciseList,
  getSortedExerciseList,
  useIsFilterEmpty,
} from '@/features/exercise';
import {
  AddTopicMenu,
  useRemoveTopicFromExerciseMutation,
} from '@/features/topic';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import RenderOnViewportEntry from '@/shared/ui/render-on-view-port-entry/RenderOnViewPortEntry';
import {
  VStack,
  Text,
  Grid,
  Icon,
  HStack,
  Slide,
  SlideFade,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

export const ExerciseUserLibraryWidget = (): JSX.Element => {
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const filterOptions = useAppSelector((state) => state.filterOptions);
  const sortBy = useAppSelector((state) => state.sortingOption.sortby);
  const dispatch = useAppDispatch();

  const [isRendered, setIsRendered] = useState<boolean>(false);

  const filteredExList = useMemo(() => {
    const arr = getFilteredExerciseList(exerciseList, filterOptions);
    setIsRendered(true);
    return getSortedExerciseList(arr, sortBy);
  }, [exerciseList, filterOptions, sortBy]);
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);
  const isFilterEmpty = useIsFilterEmpty();

  const [removeTopic, { data: exWithRemovedTopic }] =
    useRemoveTopicFromExerciseMutation();

  const features = [
    {
      title: 'Share',
      icon: BiShare,
      color: 'primary.base',
      modal: ShareExercisePopUp,
    },
    {
      icon: DeleteIcon,
      title: 'Delete',
      color: 'error.base',
      modal: DeleteExercisePopUp,
    },
  ];

  // useEffect(() => {
  //   const arr = getFilteredExerciseList(exerciseList, filterOptions);
  //   const sortedArr = getSortedExerciseList(arr, sortBy);
  //   setFilteredExList(sortedArr);
  //   setIsRendered(true);
  // }, [filterOptions, exerciseList, sortBy]);

  useEffect(() => {
    if (exWithRemovedTopic) {
      dispatch(replaceExercise(exWithRemovedTopic));
    }
  }, [exWithRemovedTopic]);
  return (
    <VStack
      w={['100%']}
      padding={['0 26px', '0 36px 0 56px']}
      mt={['64px', '80px']}
      alignItems={'flex-start'}
      gap={0}
    >
      <HStack
        justifyContent={'space-between'}
        w={'100%'}
        alignItems={'baseline'}
        flexDirection={['column', 'row']}
      >
        <HStack alignItems={'baseline'}>
          <Text fontSize={['lg', 'x-large']} fontWeight={'bold'}>
            Your exercises
          </Text>
          <Text color={'graySecondary'} fontSize={['10px', 'xs']}>
            {isFilterEmpty
              ? `${filteredExList.length} exercises`
              : `${filteredExList.length} exercises found`}
          </Text>
        </HStack>
        <SortExerciseDropDown />
      </HStack>
      {JSON.stringify(filterOptions) !==
        JSON.stringify({
          studentAge: '',
          studentLevel: '',
          skill: [],
          type: [],
          topicList: [],
        }) && <ExerciseFilterBar mt={'46px'} width={'100%'} />}
      <Grid
        mt={'24px'}
        gridTemplateColumns={'repeat(auto-fill, minmax(275px, 1fr))'}
        gap={'14px'}
        w={'100%'}
      >
        {filteredExList.map((item, index) => {
          return (
            <RenderOnViewportEntry
              threshold={0.25}
              style={{ minHeight: '240px' }}
              key={`renderwrapper ${item._id}`}
            >
              <SlideFade
                offsetY="-20px"
                in={isRendered}
                unmountOnExit
                key={`fader ${item._id}`}
              >
                <ExerciseLibraryCard
                  exersice={item}
                  TopicTag={TopicTag}
                  key={`exInfoCard ${item._id}`}
                  menuFeatures={features}
                  AddTopicMenu={AddTopicMenu}
                  // onTopicFilter={onTopicFilter}
                  onTopicDelete={removeTopic}
                />
              </SlideFade>
            </RenderOnViewportEntry>
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

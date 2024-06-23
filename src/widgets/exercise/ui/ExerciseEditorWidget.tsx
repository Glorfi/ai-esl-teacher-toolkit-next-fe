'use client';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { FaPlus, FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';
import {
  ExerciseEditCard,
  IExercise,
  replaceExercise,
} from '@/entities/exercise';
import { TopicTag } from '@/entities/topic';
import {
  ExerciseSentenceInput,
  ExerciseSelectInput,
  DeleteExercisePopUp,
  ShareExercisePopUp,
  BadgeUpdating,
  EditTitleAndDescriptionForm,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
  EditExerciseSettingsForm,
  regenerateExercise,
} from '@/features/exercise';
import { SentenceEditForm } from '@/features/sentence';
import {
  AddTopicMenu,
  useRemoveTopicFromExerciseMutation,
} from '@/features/topic';
import { APP_PATHS } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RegenerateIcon } from '@/shared/ui/icons/RegenerateIcon';
import { color } from 'framer-motion';
import { BiShare } from 'react-icons/bi';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { PiShareFat, PiShareFatBold } from 'react-icons/pi';

export const ExerciseEditorWidget = (): JSX.Element => {
  const { id } = useParams();
  const [ex, setEx] = useState<IExercise | null | undefined>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const router = useRouter();
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const dispatch = useAppDispatch();

  const [_, { data: deletedEx }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });
  const [__, { data: updatedEx }] = useUpdateExerciseMutation({
    fixedCacheKey: `exupdate`,
  });

  const [removeTopic, { data: exWithRemovedTopic }] =
    useRemoveTopicFromExerciseMutation();

  const deleteHandler = useDisclosure();
  const shareHandler = useDisclosure();

  const headerFeatures = [
    {
      onClick: () => {
        ex && regenerateExercise(ex, dispatch, router);
      },
      'aria-label': '3',
      icon: <RegenerateIcon />,
      color: 'primary.base',
      isDisabled: false,
    },
    {
      onClick: () => shareHandler.onOpen(),
      icon: <PiShareFatBold />, // <BiShare />,
      'aria-label': '1',
      color: 'primary.base',
    },
    {
      onClick: () => deleteHandler.onOpen(),
      icon: <DeleteIcon />,
      'aria-label': '2',
      color: 'error.base',
    },
  ];

  useEffect(() => {
    if (deletedEx?._id === id) {
      router.push(APP_PATHS.DASHBOARD);
    }
  }, [deletedEx]);

  useEffect(() => {
    const currentEx = exerciseList.find((item) => item._id === id);
    if (!currentEx) {
      setIsNotFound(true);
      setEx(null);
      return;
    }
    setIsNotFound(false);
    setEx(currentEx);
  }, [exerciseList, id, updatedEx]);

  useEffect(() => {
    if (exWithRemovedTopic) {
      dispatch(replaceExercise(exWithRemovedTopic));
    }
  }, [exWithRemovedTopic]);

  return (
    <>
      <Tabs
        mt={'80px'}
        mb={'20px'}
        isFitted
        variant="unstyled"
        size="lg"
        minW={['unset', 'unset', '400px', '680px']}
        colorScheme="primary"
        w={['100%', '100%', '100%', 'unset']}
        padding={['0 26px', '0 26px', '0 26px', 0]}
      >
        <TabList color={'graySecondary'}>
          <Tab
            fontSize={'2xl'}
            fontWeight={'bold'}
            _selected={{ color: 'primary.base' }}
            justifyContent={['center', 'flex-end']}
          >
            Edit exercise
          </Tab>
          <Tab
            fontSize={'2xl'}
            fontWeight={'bold'}
            _selected={{ color: 'primary.base' }}
            justifyContent={['center', 'flex-start']}
          >
            Preview
          </Tab>
        </TabList>
        <TabPanels
          w={'100%'}

          //  minW={['unset', 'unset','unset','unset','680px']}
          // maxW={['unset', '600px']}
        >
          <TabPanel
            p={0}
            position={'relative'}
            maxW={['unset', 'unset', 'unset', '680px']}
          >
            {ex ? (
              <ExerciseEditCard
                exercise={ex}
                key={`${ex._id}_editForm`}
                cardFeatures={headerFeatures}
                UpdatingBadge={BadgeUpdating}
                TitleDescriptionForm={EditTitleAndDescriptionForm}
                SentenceEditForm={SentenceEditForm}
                TopicTag={TopicTag}
                OnTopicDelete={removeTopic}
                AddTopicMenu={AddTopicMenu}
                EditExerciseSettingsForm={EditExerciseSettingsForm}
              />
            ) : null}
          </TabPanel>
          <TabPanel
            p={0}
            // borderTop={'none'}
            // borderRight={'1px solid'}
            // borderLeft={'1px solid'}
            // borderColor={'gray.200'}
            // borderBottomEndRadius={'20px'}
            maxW={['unset', 'unset', 'unset', '680px']}
          >
            {isNotFound ? (
              <Text>Ooops! Seems The exercise isn't found</Text>
            ) : null}
            {ex?.type === 'fillInGaps' ? (
              <ExerciseSentenceInput
                sentenceList={ex.sentenceList}
                taskDescription={ex.taskDescription}
                isRandomOrderEnabled={ex.isRandomOrderEnabled}
              />
            ) : null}
            {ex?.type === 'multipleChoice' ? (
              <ExerciseSelectInput
                sentenceList={ex.sentenceList}
                taskDescription={ex.taskDescription}
                isRandomOrderEnabled={ex.isRandomOrderEnabled}
              />
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {ex && (
        <>
          <ShareExercisePopUp
            isOpen={shareHandler.isOpen}
            onClose={shareHandler.onClose}
            onOpen={shareHandler.onOpen}
            id={ex._id}
          />
          <DeleteExercisePopUp
            isOpen={deleteHandler.isOpen}
            onClose={deleteHandler.onClose}
            onOpen={deleteHandler.onOpen}
            id={ex._id}
          />
        </>
      )}
    </>
  );
};

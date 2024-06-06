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
      colorScheme: 'secondary',
     // toolTipTitle: 'Available in future release!',
      isDisabled: false,
    },
    {
      onClick: () => shareHandler.onOpen(),
      icon: <FaRegShareFromSquare />,
      'aria-label': '1',
      colorScheme: 'secondary',
    },
    {
      onClick: () => deleteHandler.onOpen(),
      icon: <FaRegTrashCan />,
      'aria-label': '2',
      colorScheme: 'error',
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
        mt={'40px'}
        isFitted
        variant="enclosed"
        size="md"
        minW={['unset', '600px']}
        colorScheme="secondary"
      >
        <TabList>
          <Tab>Edit</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels
          w={'100%'}
          minW={['unset', '600px']}
          maxW={['unset', '600px']}
        >
          <TabPanel
            p={0}
            borderTop={'none'}
            borderRight={'1px solid'}
            borderLeft={'1px solid'}
            borderColor={'gray.200'}
            borderBottomEndRadius={'20px'}
            position={'relative'}
          >
            {ex ? (
              <ExerciseEditCard
                exercise={ex}
                key={`${ex._id}_editForm`}
                headerIconFeatures={headerFeatures}
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
            borderTop={'none'}
            borderRight={'1px solid'}
            borderLeft={'1px solid'}
            borderColor={'gray.200'}
            borderBottomEndRadius={'20px'}
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

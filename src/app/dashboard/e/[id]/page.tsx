'use client';
import { ExerciseEditForm } from '@/components/ExerciseEditForm';
import { ExerciseSelectInput } from '@/components/ExerciseSelectInput';
import { ExerciseSentenceInput } from '@/components/ExerciseSentenceInput';
import { MobileMenuDashBoard } from '@/components/MobileMenuDashboard';
import { SideBarMenu } from '@/components/SideBar/SideBar';
import { APP_PATHS } from '@/constants/AppPaths';
import { IExercise } from '@/interfaces/exercise';
import { useDeleteExerciseMutation } from '@/store/main-api/mutations/deleteExercise';
import { RootState } from '@/store/store';
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DashboardExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const router = useRouter();

  const [ex, setEx] = useState<IExercise | null | undefined>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  const exerciseList = useSelector((state: RootState) => state.exerciseList);

  const [_, { data: deletedEx }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    if (deletedEx?._id === id) {
      router.push(APP_PATHS.DASHBOARD);
    }
  }, [deletedEx]);

  useEffect(() => {
    const currentEx = exerciseList.find((item) => item._id === id);
    console.log(currentEx);
    if (!currentEx) {
      setIsNotFound(true);
      setEx(null);
      return;
    }
    setIsNotFound(false);
    setEx(currentEx);
  }, [exerciseList, id]);

  return (
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
      <TabPanels w={'100%'} minW={['unset', '600px']} maxW={['unset', '600px']}>
        <TabPanel p={0} borderTop={'none'}>
          {ex ? (
            <ExerciseEditForm exercise={ex} key={`${ex._id}_editForm`} />
          ) : null}
        </TabPanel>
        <TabPanel p={0} borderTop={'none'}>
          {isNotFound ? (
            <Text>Ooops! Seems The exercise isn't found</Text>
          ) : null}
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DashboardExercisePage;

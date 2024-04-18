import { RootState } from '@/app/lib/store/store';
import { IExercise } from '@/entities/exercise';
import { useAppSelector } from '@/shared/hooks/hooks';
import { createSelector } from '@reduxjs/toolkit';

const selectAllExercises = (state: RootState) => state.exerciseList;
// MEMOIZED WAY TO SOLVE
export const userTopicsSelector = createSelector(
  selectAllExercises,
  (exercises) => {
    const allTopicsList = exercises.flatMap((exercise) => exercise.topicList);
    const uniqueIds = new Set();
    const uniqueArray = allTopicsList.filter((item) => {
      if (!uniqueIds.has(item._id)) {
        uniqueIds.add(item._id);
        return true;
      }
      return false;
    });

    return uniqueArray;
  }
);
// NO MEMO WAY (CURRENTY USED)
export const getUniqueUserTopics = (exercises: IExercise[]) => {
  const allTopicsList = exercises.flatMap((exercise) => exercise.topicList);
  const uniqueIds = new Set();
  const uniqueArray = allTopicsList.filter((item) => {
    if (!uniqueIds.has(item._id)) {
      uniqueIds.add(item._id);
      return true;
    }
    return false;
  });

  return uniqueArray;
};

import { RootState } from '@/app/lib/store/store';
import { useAppSelector } from '@/shared/hooks/hooks';
import { createSelector } from '@reduxjs/toolkit';

const selectAllExercises = (state: RootState) => state.exerciseList;
// Подумать позже куда поместить этот селектор
export const userTopicsSelector = createSelector(
  selectAllExercises,
  (exercises) => {
    const allTopicsList = exercises.flatMap((exercise) => exercise.topicList);
    const uniqueIds: string[] = [];
    const uniqueArray = allTopicsList.filter((item) => {
      if (!uniqueIds.includes(item._id)) {
        uniqueIds.push(item._id);
        return true;
      }
    });
    return uniqueArray;
  }
);

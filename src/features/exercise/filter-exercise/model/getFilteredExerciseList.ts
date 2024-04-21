import { IExercise } from '@/entities/exercise';
import { IFilterOptions } from './types';

export const getFilteredExerciseList = (
  exerciseList: IExercise[],
  filterOptions: IFilterOptions
) => {
  return exerciseList.filter((exercise) => {
    if (
      filterOptions.skill.length > 0 &&
      !filterOptions.skill.includes(exercise.skill)
    ) {
      return false;
    }
    if (filterOptions.studentAge.length > 0 && filterOptions.studentAge !== exercise.studentAge) {
      return false;
    }
    if (filterOptions.studentLevel.length > 0 && filterOptions.studentLevel !== exercise.studentLevel) {
      return false;
    }
    if (
      filterOptions.type.length > 0 &&
      !filterOptions.type.includes(exercise.type)
    ) {
      return false;
    }
    if (filterOptions.topicList.length > 0) {
      if (exercise.topicList.length === 0) {
        return false;
      }
      const commonTopics = exercise.topicList.some((topic) =>
        filterOptions.topicList.includes(topic._id)
      );
      if (!commonTopics) {
        return false;
      }
    }
    return true;
  });
};

import { IExercise } from '@/entities/exercise';

export const getSortedExerciseList = (
  exerciseList: IExercise[],
  sortby:
    | 'Update'
    | 'Popularity'
    | 'Newest to oldest'
    | 'Oldest to newest'
    | 'A-Z'
    | 'Z-A'
) => {
  if (sortby === 'Update') {
    exerciseList.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }
  if (sortby === 'Popularity') {
    exerciseList.sort((a, b) => b.views - a.views);
  }
  if (sortby === 'Newest to oldest') {
    exerciseList.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  if (sortby === 'Oldest to newest') {
    exerciseList.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  if (sortby === 'A-Z') {
    exerciseList.sort((a, b) => {
      if (!a.title && !b.title) return 0;
      if (!a.title) return 1;
      if (!b.title) return -1;
      return a.title.localeCompare(b.title);
    });
  }
  if (sortby === 'Z-A') {
    exerciseList.sort((a, b) => {
      if (!a.title && !b.title) return 0;
      if (!a.title) return 1;
      if (!b.title) return -1;
      return b.title.localeCompare(a.title);
    });
  }

  return exerciseList;
};

import { IExercise } from '../interfaces/exercise';

export function getTodayExercises(array: IExercise[]) {
  const currentDate = new Date();
  const updatedTodayList = array.filter((exercise) => {
    const updatedTime = new Date(exercise.updatedAt);
    return (
      updatedTime.getDate() === currentDate.getDate() &&
      updatedTime.getMonth() === currentDate.getMonth() &&
      updatedTime.getFullYear() === currentDate.getFullYear()
    );
  });

  const sortedUpdatedTodayList = updatedTodayList.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return sortedUpdatedTodayList;
}

import { IExercise } from "../model/models";

export function getRestExercises(array: IExercise[]) {
  const currentDate = new Date();
  const date7DaysAgo = new Date(currentDate);
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  date7DaysAgo.setDate(yesterday.getDate() - 5);

  const updatedEarlierList = array.filter((exercise) => {
    const updatedTime = new Date(exercise.updatedAt);
    return updatedTime <= date7DaysAgo;
  });
  const sortedList = updatedEarlierList.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return sortedList;
}

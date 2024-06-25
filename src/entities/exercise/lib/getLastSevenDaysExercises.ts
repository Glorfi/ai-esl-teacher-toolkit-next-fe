import { IExercise } from "../model/models";


export function getLastSevenDaysExercises(array: IExercise[]) {
  const currentDate = new Date();
  const date7DaysAgo = new Date(currentDate);
  date7DaysAgo.setDate(currentDate.getDate() - 7);

  const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));

  const yesterday = new Date(startOfToday);
  yesterday.setDate(startOfToday.getDate() - 1);
  
  const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));

  const updatedSevenDaysList = array.filter((exercise) => {
    const updatedTime = new Date(exercise.updatedAt);
    return updatedTime >= date7DaysAgo && updatedTime < startOfYesterday;
  });

  const sortedSevenDaysList = updatedSevenDaysList.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return sortedSevenDaysList;
}

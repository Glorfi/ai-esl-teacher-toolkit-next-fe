import { IExercise } from "../model/models";

export function getYesterdayExercises(array: IExercise[]) {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);

  if (currentDate.getDate() === 1) {
    if (currentDate.getMonth() === 0) {
      yesterday.setFullYear(currentDate.getFullYear() - 1);
      yesterday.setMonth(11);
      yesterday.setDate(31);
    } else {
      yesterday.setMonth(currentDate.getMonth() - 1);
      yesterday.setDate(0);
    }
  } else {
    yesterday.setDate(currentDate.getDate() - 1);
  }
  const updatedYesterdayList = array.filter((exercise) => {
    const updatedTime = new Date(exercise.updatedAt);
    return (
      updatedTime.getDate() === yesterday.getDate() &&
      updatedTime.getMonth() === yesterday.getMonth() &&
      updatedTime.getFullYear() === yesterday.getFullYear()
    );
  });
  const sortedYesterdayList = updatedYesterdayList.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return sortedYesterdayList;
}

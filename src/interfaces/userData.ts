import { IExercise } from './exercise';

export interface IUserData {
  _id: string;
  role: string;
  email: string;
  exercises: IExercise[];
  __v: number;
}

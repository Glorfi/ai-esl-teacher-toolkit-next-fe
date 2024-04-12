import { IExercise } from "@/entities/exercise";

export interface IUserData {
  _id: string;
  role: string;
  email: string;
  exercises: IExercise[];
  __v: number;
}

import { IExerciseCreate } from '../exercise';

export interface ICreateExerciseRequest {
  token: string | null;
  body: IExerciseCreate;
}

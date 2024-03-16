import { IExerciseGenerate } from '../exercise';

export interface IGenerateExerciseRequest {
  token: string | null;
  body: IExerciseGenerate;
}

export interface IUpdateExerciseRequest {
  token: string | null;
  id: string;
  body: IUpdateExerciseBodyRequest;
}

interface IUpdateExerciseBodyRequest {
  taskDescription?: string;
  title?: string;
}

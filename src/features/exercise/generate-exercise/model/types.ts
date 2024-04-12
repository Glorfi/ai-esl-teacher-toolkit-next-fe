export interface IFormValues {
  skill: 'grammar' | 'vocabulary' | string;
  taskType: string;
  wordList: string;
  learnerLevel: string;
  learnerAge: 'children' | 'teenagers' | 'adults' | string;
  isStrictChecking: boolean;
}

interface IExerciseGenerate {
  type: string;
  skill: string;
  prompt: string;
  studentAge: string;
  studentLevel: string;
  isStrictChecking: boolean;
}

export interface IGenerateExerciseRequest {
  token: string | null;
  body: IExerciseGenerate;
}

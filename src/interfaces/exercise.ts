import { ISentence } from './sentence-with-input';

export interface IExercise {
  owner: string[] | string;
  skill: 'grammar' | 'vocabulary';
  type: 'fillInGaps' | 'multipleChoice';
  _id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sentenceList: ISentence[];
  title?: string;
  taskDescription?: string;
  studentLevel?: string;
  studentAge?: number;
  isRandomOrderEnabled?: boolean;
  __v: number;
}

export interface IExerciseCreate {
  type: string;
  skill: string;
  sentenceList: ISentence[];
}

export interface IExerciseGenerate {
  type: string;
  skill: string;
  prompt: string;
}

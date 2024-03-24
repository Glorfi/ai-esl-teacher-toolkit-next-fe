import { ISentence } from './sentence-with-input';
import { ITopic } from './topic';

export interface IExercise {
  owner: string[] | string;
  skill: 'grammar' | 'vocabulary';
  type: 'fillInGaps' | 'multipleChoice';
  _id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sentenceList: ISentence[];
  topicList: ITopic[] |[] 
  title?: string;
  taskDescription?: string;
  studentLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | string
  studentAge?: string;
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
  studentAge: string;
  studentLevel: string;
}

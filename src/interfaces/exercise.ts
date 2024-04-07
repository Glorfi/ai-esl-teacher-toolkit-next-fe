
import { ISentence } from '@/entities/sentence';
import { ITopic } from './topic';



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
  isStrictChecking: boolean;
}

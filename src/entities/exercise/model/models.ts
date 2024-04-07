import { ISentence } from '@/entities/sentence';
import { ITopic } from '@/interfaces/topic';

export interface IExercise {
  owner: string[] | string;
  skill: 'grammar' | 'vocabulary';
  type: 'fillInGaps' | 'multipleChoice';
  _id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sentenceList: ISentence[];
  topicList: ITopic[] | [];
  title?: string;
  taskDescription?: string;
  studentLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | string;
  studentAge?: string;
  isRandomOrderEnabled?: boolean;
  __v: number;
}

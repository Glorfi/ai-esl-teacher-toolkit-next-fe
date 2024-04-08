import { ISentence } from '@/entities/sentence';
import { ITopic } from '@/interfaces/topic';
import { MenuItemProps } from '@chakra-ui/react';

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

export interface IExerciseSidbarThumbnailProps {
  data: IExercise;
  menuFeatures: IMenuFeatures[];
}

//вынести в публичный интерфейс
export interface IMenuFeatures extends MenuItemProps {
  onMenuItem?: () => void;
  title: string;
  icon?: any;
  modal?: React.ComponentType<any>;
}
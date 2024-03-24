import { IRemoveTopic } from '../topic';

export interface IRemoveTopicFromExerciseRequest {
  token: string | null;
  exerciseId: string;
  topicId: string;
}

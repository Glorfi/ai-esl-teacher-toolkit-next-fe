import { IAddTopic } from "../topic";

export interface IAddTopicToExerciseRequest {
  token: string | null;
  body: IAddTopic
}

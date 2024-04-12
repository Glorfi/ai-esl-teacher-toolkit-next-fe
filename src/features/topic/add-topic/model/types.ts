export interface IGetTopicsAutoCompleteRequest {
  token: string | null;
  name: string;
}

export interface IAddTopicToExerciseRequest {
  token: string | null;
  body: IAddTopic;
}

export interface IAddTopic {
  exerciseId: string;
  topicId?: string;
  skill?: string;
  name?: string;
}

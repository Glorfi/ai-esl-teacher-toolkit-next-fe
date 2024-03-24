export interface ITopic {
  skill: string;
  name: string;
  _id: string;
}

export interface IAddTopic {
  exerciseId: string;
  topicId?: string;
  skill?: string;
  name?: string;
}

export interface IRemoveTopic {
  exerciseId: string;
  topicId: string;
}

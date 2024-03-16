export interface IGptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: IChoice[];
  usage: IUsage;
  system_fingerprint: any;
}

export interface IChoice {
  index: number;
  message: IMessage;
  logprobs: any;
  finish_reason: string;
}

export interface IMessage {
  role: string;
  content: string;
}

export interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

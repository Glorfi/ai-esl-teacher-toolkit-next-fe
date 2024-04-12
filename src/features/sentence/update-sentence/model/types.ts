export interface IUpdateSentenceRequest {
  token: string | null;
  id: string;
  body: ISentenceBodyUpdateRequest;
}

export interface ISentenceBodyUpdateRequest {
  sentence: string | null;
  answer: string | null;
  hint?: string | null;
  options?: string[] | null;
}

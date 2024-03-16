export interface ISentence {
  sentence: string;
  answer: string;
  hint?: string;
  options?: string[];
  exercise?: string;
  _id: string;
  __v?: number;
}

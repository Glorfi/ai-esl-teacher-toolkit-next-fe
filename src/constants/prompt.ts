export const ROLE_SKILL = {
  vocabulary: 'vocabulary sentences',
};

export const WORKSHEET_SKILL = {
  vocabulary: 'vocabulary practice',
};

export const VOCABULARY_WORKSHEET_TYPE = {
  fillInGaps: `In your reply write nothing else but JSON:
  [ {"sentence": "your sentence generated here",
   "answer":  "the form of the word or the phrase in your sentence",
   "hint":  "the base form of the word or the phrase",
"options": "is the array of strings with options for mutliple choise, options should contain the correct answer from the answer field and 2 wrong but similar in meaning but incompatible words"}]`,
  multipleChoice: `In your reply write nothing else but JSON:
  [ {"sentence": "your sentence generated here",
   "answer":  "the form of the word or the phrase in your sentence",
   "hint":  "the base form of the word or the phrase",
"options": "is the array of strings with options for mutliple choise, options should contain the correct answer from the answer field and 2 wrong but similar in meaning but incompatible words"}]`,
};

// export const VOCABULARY_WORKSHEET_TYPE = {
//   fillInGaps: `I need a JSON with the following keys:
//   "sentence" is the sentence you generate with answers included.
//   "answer" is the form of the word or the phrase in your sentence.
//   "hint" is the base form of the word or the phrase.
//   [{ "sentence",
//   "answer",
//   "hint"}  ...]`,
//   multipleChoice: `I need a JSON with the following keys:
//   "sentence" is the sentence you generate with the answer included.
//   "answer" is the form of the word or the phrase in your sentence.
//   "hint" is the base form of the word or the phrase.
// "options" is the array of strings with options for mutliple choise, options should contain the correct answer and 2 incompatible but lexically similar words.
//   [{ "sentence",
//   "answer",
//   "hint",
// "options",}  ...]`,
// };

export const LEARNER_LEVEL = {
  A1: 'the beginner A1 level',
  A2: 'the elementary A2 level',
  B1: 'the intermediate B1 level',
  B2: 'the upper-intermediate B2 level',
  C1: 'the advanced C1 level',
};

export const LEARNER_AGE = {
  children: 'children from 7 to 12 years',
  teenagers: 'teenagers from 13 to 20 years',
  adults: 'adults from 25 to 50 years old',
};

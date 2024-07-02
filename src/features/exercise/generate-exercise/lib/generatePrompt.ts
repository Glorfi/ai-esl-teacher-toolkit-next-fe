import {
  LEARNER_LEVEL,
  LEARNER_AGE,
  ROLE_SKILL,
  WORKSHEET_SKILL,
  VOCABULARY_WORKSHEET_TYPE,
} from '@/shared';
import {
  GRAMMAR_WORKSHEET_TYPE,
  WORKSHEET_TARGET_CONSTRUCTION,
} from '@/shared/constants/prompt';
import { useEffect, useState } from 'react';

interface IConfig {
  roleSkill: string;
  workSheetSkill: string;
  task: string;
  targetConstruction: string;
  wordList?: string | undefined;
  learnerLevel?: string;
  learnerAge?: string;
}

export const useGeneratePrompt = (
  skill: string,
  task: string,
  words?: string,
  learnerLevel?: string,
  learnerAge?: string
) => {
  const [config, setConfig] = useState<IConfig>({
    roleSkill: '',
    workSheetSkill: '',
    targetConstruction: '',
    task: '',
    wordList: '',
    learnerLevel: LEARNER_LEVEL.B1,
    learnerAge: LEARNER_AGE.adults,
  });
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    if (skill === 'vocabulary') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        roleSkill: ROLE_SKILL.vocabulary,
        workSheetSkill: WORKSHEET_SKILL.vocabulary,
        targetConstruction: WORKSHEET_TARGET_CONSTRUCTION.vocabulary,
      }));
      // setConfig((prevConfig) => ({
      //   ...prevConfig,

      // }));
      // setConfig
    }
    if (skill === 'grammar') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        roleSkill: ROLE_SKILL.grammar,
        targetConstruction: WORKSHEET_TARGET_CONSTRUCTION.grammar,
        workSheetSkill: WORKSHEET_SKILL.grammar,
      }));
      // setConfig((prevConfig) => ({
      //   ...prevConfig,
      //   workSheetSkill: WORKSHEET_SKILL.grammar,
      // }));
    }
    if (task === 'fillInGaps') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        task:
          skill === 'vocabulary'
            ? VOCABULARY_WORKSHEET_TYPE.fillInGaps
            : skill === 'grammar'
            ? GRAMMAR_WORKSHEET_TYPE.fillInGaps
            : '',
      }));
    }
    if (task === 'multipleChoice') {
      setConfig((prevConfig) => ({
        ...prevConfig,
        task:
          skill === 'vocabulary'
            ? VOCABULARY_WORKSHEET_TYPE.multipleChoice
            : skill === 'grammar'
            ? GRAMMAR_WORKSHEET_TYPE.multipleChoice
            : '',
      }));
    }
    if (words) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        wordList: words,
      }));
    }
    if (learnerLevel) {
      const levelMapping: Record<string, string> = {
        A1: LEARNER_LEVEL.A1,
        A2: LEARNER_LEVEL.A2,
        B1: LEARNER_LEVEL.B1,
        B2: LEARNER_LEVEL.B2,
        C1: LEARNER_LEVEL.C1,
      };
      setConfig((prevConfig) => ({
        ...prevConfig,
        learnerLevel: levelMapping[learnerLevel] || prevConfig.learnerLevel,
      }));
    }
    if (learnerAge) {
      const ageMapping: Record<string, string> = {
        children: LEARNER_AGE.children,
        teenagers: LEARNER_AGE.teenagers,
        adults: LEARNER_AGE.adults,
      };
      setConfig((prevConfig) => ({
        ...prevConfig,
        learnerAge: ageMapping[learnerAge] || prevConfig.learnerLevel,
      }));
    }
  }, [skill, task, words, learnerLevel, learnerAge]);

  useEffect(() => {
    setPrompt(`You are a tutor creating ${config.roleSkill}. The sentences will provide ${config.workSheetSkill}.
    Compose sentences to practice ${config.targetConstruction}:
    ${config.wordList}
    Do not use modifiers between words of the phrase.
    The sentence should be appropriate for ${config.learnerLevel}.
    The learners are ${config.learnerAge}.
    The sentences should use casual language.
    ${config.task}`);
  }, [config]);

  return prompt;
};
//    In your reply write nothing else but JSON

import { useAppDispatch } from '@/shared/hooks/hooks';
import { addValues } from '../../generate-exercise/model/exercise-form-router';
import { IFormValues } from '../../generate-exercise/model/types';
import { useRouter } from 'next/navigation';
import { APP_PATHS } from '@/shared';
import { IExercise } from '@/entities/exercise';
import { getStudentAgeMapped } from '../../generate-exercise/lib/getStudentAgeMapped';
import { getStudentAgeMappedForPrompt } from './getStudentAgeMapedFromExData';

export const regenerateExercise = (
  ex: IExercise,
  dispatch: any,
  router: any
) => {
  const payload: IFormValues = {
    skill: ex.skill,
    taskType: ex.type,
    wordList: ex.sentenceList.map((item) => item.answer).join(', '),
    learnerLevel: ex.studentLevel ? ex.studentLevel.slice(-2) : '',
    learnerAge: ex.studentAge ? getStudentAgeMappedForPrompt(ex.studentAge) : '',
    isStrictChecking: true,
  };

  dispatch(addValues(payload));
  router.push(APP_PATHS.DASHBOARD);
};

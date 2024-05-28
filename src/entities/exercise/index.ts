import dynamic from 'next/dynamic';

// COMPONENTS
export { RecentExercisesBox } from './ui/recent-box/RecentExercisesBox';
export { ExerciseContainer } from './ui/shared-container/ExerciseContainter';
export { ExerciseEditCard } from './ui/edit-card/ExerciseEditCard';

export const ExerciseSidbarThumbnail = dynamic(
  () => import('./ui/thumbnail/ExerciseThumbnail')
);
export const ExerciseLibraryCard = dynamic(
  () => import('./ui/info-card/ExerciseLibraryCard')
);
//TYPES
export type { IExercise } from './model/models';

//ROUTER AND ACTIONS
export { exerciseListRouter } from './model/exercise-list-router';
export {
  addExerciseList,
  removeExercise,
  addExercise,
  replaceExercise,
  replaceSentence,
  updateTimeStampById,
  resetExerciseList,
} from './model/exercise-list-router';

import { CreateExerciseButton, ExerciseFilterForm } from '@/features/exercise';
import { OpenProfileThumbnail } from '@/features/user';
import { MobileMenuContainer } from '@/shared';

export const MobileMenuUserLibrary = (): JSX.Element => {
  return (
    <MobileMenuContainer>
      <CreateExerciseButton />
      <ExerciseFilterForm />
      <OpenProfileThumbnail />
    </MobileMenuContainer>
  );
};

import { CreateExerciseButton, ExerciseFilterForm } from '@/features/exercise';
import { OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared';

interface ISideBarDashboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarUserLibrary = (
  props: ISideBarDashboardProps
): JSX.Element => {
  const { isOpen, onToggle } = props;

  return (
    <SidebarContainer isOpen={isOpen} onToggle={onToggle}>
      <CreateExerciseButton />
      <ExerciseFilterForm />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

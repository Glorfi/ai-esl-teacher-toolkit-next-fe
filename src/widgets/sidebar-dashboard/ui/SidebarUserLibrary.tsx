import { CreateExerciseButton, ExerciseFilterForm } from '@/features/exercise';
import { OpenLibraryThumbnail, OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared';
import { Divider } from '@chakra-ui/react';

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
      <Divider borderColor={'#52617B'} opacity={'1'} />
      <OpenLibraryThumbnail />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

import {
  ExerciseSidbarThumbnail,
  RecentExercisesBox,
} from '@/entities/exercise';
import {
  CreateExerciseButton,
  DeleteExercisePopUp,
  ShareExercisePopUp,
} from '@/features/exercise';
import { OpenLibraryThumbnail, OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared';
import { Box, Divider } from '@chakra-ui/react';

import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

interface ISideBarDashboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarUserProfile = (
  props: ISideBarDashboardProps
): JSX.Element => {
  const { isOpen, onToggle } = props;

  return (
    <SidebarContainer isOpen={isOpen} onToggle={onToggle}>
      <CreateExerciseButton />
      <Box flexGrow={1}></Box>
      <Divider borderColor={'#52617B'} opacity={'1'} />
      <OpenLibraryThumbnail />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

import {
  ExerciseSidbarThumbnail,
  RecentExercisesBox,
} from '@/entities/exercise';
import {
  CreateExerciseButton,
  DeleteExercisePopUp,
  ExerciseFilterForm,
  ShareExercisePopUp,
} from '@/features/exercise';
import { OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared';
import { VStack } from '@chakra-ui/react';

import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

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

      {/* <RecentExercisesBox
        ExerciseThumbNail={ExerciseSidbarThumbnail}
        ThumbNailMenuFeatures={features}
      /> */}
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

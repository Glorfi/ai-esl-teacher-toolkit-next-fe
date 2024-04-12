import {
  ExerciseSidbarThumbnail,
  RecentExercisesBox,
} from '@/entities/exercise';
import {
  CreateExerciseButton,
  DeleteExercisePopUp,
  ShareExercisePopUp,
} from '@/features/exercise';
import { OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared';

import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

interface ISideBarDashboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarDashboard = (
  props: ISideBarDashboardProps
): JSX.Element => {
  const { isOpen, onToggle } = props;

  const features = [
    {
      title: 'Share',
      icon: FaRegShareFromSquare,
      modal: ShareExercisePopUp,
    },
    {
      icon: FaRegTrashCan,
      title: 'Delete',
      color: 'error.base',
      modal: DeleteExercisePopUp,
    },
  ];

  return (
    <SidebarContainer isOpen={isOpen} onToggle={onToggle}>
      <CreateExerciseButton />
      <RecentExercisesBox
        ExerciseThumbNail={ExerciseSidbarThumbnail}
        ThumbNailMenuFeatures={features}
      />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};
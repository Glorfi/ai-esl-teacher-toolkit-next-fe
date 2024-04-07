import {
  ExerciseSidbarThumbnail,
  RecentExercisesBox,
} from '@/entities/exercise';
import { CreateExerciseButton } from '@/features/exercise';
import { OpenProfileThumbnail } from '@/features/user';
import { SidebarContainer } from '@/shared/sidebar/Sidebar';
import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

interface ISideBarDashboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarDashboard = (
  props: ISideBarDashboardProps
): JSX.Element => {
  const { isOpen, onToggle } = props;

function onDelete() {
  
}

  return (
    <SidebarContainer isOpen={isOpen} onToggle={onToggle}>
      <CreateExerciseButton />
      <RecentExercisesBox
        ExerciseThumbNail={ExerciseSidbarThumbnail}
        ThumbNailMenuFeatures={[
          {
            feature: () => console.log('Share'),
            title: 'Share',
            icon: FaRegShareFromSquare,
          },
          {
            feature: () => console.log('Delete'),
            icon: FaRegTrashCan,
            title: 'Delete',
            color: 'error.base',
          },
        ]}
      />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

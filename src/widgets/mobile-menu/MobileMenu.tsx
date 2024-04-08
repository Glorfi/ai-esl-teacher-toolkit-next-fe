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
import { MobileMenuContainer } from '@/shared';
import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';

export const MobileMenuDashBoard = (): JSX.Element => {
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
    <MobileMenuContainer>
      <CreateExerciseButton />
      <RecentExercisesBox
        ExerciseThumbNail={ExerciseSidbarThumbnail}
        ThumbNailMenuFeatures={features}
      />
      <OpenProfileThumbnail />
    </MobileMenuContainer>
  );
};

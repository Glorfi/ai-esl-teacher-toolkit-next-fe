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
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { Divider } from '@chakra-ui/react';
import { BiShare } from 'react-icons/bi';

import { FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';
import { PiShareFatBold } from 'react-icons/pi';

interface ISideBarDashboardProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarDashboardWithRecentEx = (
  props: ISideBarDashboardProps
): JSX.Element => {
  const { isOpen, onToggle } = props;

  const features = [
    {
      title: 'Share',
      icon: PiShareFatBold,
      color: 'primary.base',
      modal: ShareExercisePopUp,
    },
    {
      icon: DeleteIcon,
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
      <Divider borderColor={'#52617B'} opacity={'1'} />
      <OpenLibraryThumbnail />
      <OpenProfileThumbnail />
    </SidebarContainer>
  );
};

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
import { MobileMenuContainer } from '@/shared';
import { Box, Divider } from '@chakra-ui/react';
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
      <Box position={'fixed'} w={'100%'} bottom={0} p={'0 20px 20px'}>
        <Divider borderColor={'#52617B'} opacity={'1'} />
        <OpenLibraryThumbnail />
        <OpenProfileThumbnail />
      </Box>
    </MobileMenuContainer>
  );
};

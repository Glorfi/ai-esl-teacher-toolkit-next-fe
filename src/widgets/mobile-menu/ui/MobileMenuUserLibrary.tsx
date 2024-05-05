import { CreateExerciseButton, ExerciseFilterForm } from '@/features/exercise';
import { OpenLibraryThumbnail, OpenProfileThumbnail } from '@/features/user';
import { MobileMenuContainer } from '@/shared';
import { Box, Divider } from '@chakra-ui/react';

export const MobileMenuUserLibrary = (): JSX.Element => {
  return (
    <MobileMenuContainer>
      <CreateExerciseButton />
      <ExerciseFilterForm />
      <Box position={'fixed'} w={'100%'} bottom={0} p={'0 20px 20px'}>
        <Divider borderColor={'#52617B'} opacity={'1'} />
        <OpenLibraryThumbnail />
        <OpenProfileThumbnail />
      </Box>
    </MobileMenuContainer>
  );
};

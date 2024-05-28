import { APP_PATHS } from '@/shared/constants/AppPaths';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { PiNotePencil } from 'react-icons/pi';

export const CreateExerciseButton = (): JSX.Element => {
  return (
    <Button
      w={['calc(100% - 32px)']}
      rightIcon={<PiNotePencil />}
      variant={'ghost'}
      colorScheme={'whiteOpacity'}
      justifyContent={'space-between'}
      fontWeight={600}
      size={'lg'}
      fontSize={'16px'}
      padding={'0 16px'}
      as={Link}
      href={APP_PATHS.DASHBOARD}
    >
      Create Exercise
    </Button>
  );
};

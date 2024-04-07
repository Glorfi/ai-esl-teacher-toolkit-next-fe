import { APP_PATHS } from "@/constants/AppPaths";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { PiNotePencil } from "react-icons/pi";

export const CreateExerciseButton = (): JSX.Element => {
  return (
    <Link href={APP_PATHS.DASHBOARD} w={'100%'}>
      <Button
        w={'100%'}
        rightIcon={<PiNotePencil />}
        variant={'ghost'}
        colorScheme={'whiteOpacity'}
        justifyContent={'space-between'}
        fontWeight={600}
        size={'lg'}
        fontSize={'16px'}
        padding={'0 16px'}
      >
        Create Exercise
      </Button>
    </Link>
  );
};

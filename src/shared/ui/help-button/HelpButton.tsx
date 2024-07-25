import { Button, IconButton, MenuButtonProps } from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { forwardRef } from '@chakra-ui/react';

export const HelpButton = forwardRef<MenuButtonProps, 'button'>(
  (props, ref) => {
    return (
      <Button
        size={'md'}
        aria-label="Search database"
        variant={'solid'}
        //colorScheme={'primary'}
        bgColor={'grayAlt'}
        borderRadius={"100px"}
        ref={ref}
        {...props}
      >
        ?
      </Button>
    );
  }
);

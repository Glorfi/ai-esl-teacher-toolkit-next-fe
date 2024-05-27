import { IconButton, MenuButtonProps } from '@chakra-ui/react';
import { HiDotsHorizontal, HiDotsVertical } from 'react-icons/hi';
import { forwardRef } from '@chakra-ui/react';

export const ExMenuCardButton = forwardRef<MenuButtonProps, 'button'>(
  (props, ref) => {
    return (
      <IconButton
        size={'xs'}
        aria-label="Search database"
        icon={<HiDotsVertical className={'thumbNailButton'} />}
        variant={'outline'}
        // colorScheme={'secondary'}
        isRound
        ref={ref}
        {...props}
        className="thumbNailButton"
        color={'secondary.base'}
      />
    );
  }
);

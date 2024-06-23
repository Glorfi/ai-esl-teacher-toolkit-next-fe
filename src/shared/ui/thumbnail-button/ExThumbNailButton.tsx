import { IconButton, MenuButtonProps } from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { forwardRef } from '@chakra-ui/react';

export const ExThumbnailButton = forwardRef<MenuButtonProps, 'button'>(
  (props, ref) => {
    return (
      <IconButton
        size={'xs'}
        aria-label="Search database"
        icon={<HiDotsHorizontal className={'thumbNailButton'} />}
        variant={'outline'}
        colorScheme={'whiteOpacity'}
        //color={'background'}
        isRound
        ref={ref}
        {...props}
        className="thumbNailButton"
      />
    );
  }
);

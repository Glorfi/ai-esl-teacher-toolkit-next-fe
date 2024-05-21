import './sideBar.css';
import { HStack, VStack, IconButton, Box } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';

interface ISideBarMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: JSX.Element[] | JSX.Element;
}

export const SidebarContainer = (props: ISideBarMenuProps): JSX.Element => {
  const { isOpen, onToggle, children } = props;

  return (
    <HStack gap={0} display={['none', 'flex']} position={'fixed'}>
      <Box
        display={['none', 'flex']}
        minH={'100vh'}
        height={'100%'}
        bgColor={'primary.base'}
        className={`sliderMenu ${
          isOpen ? 'sliderMenu_isOpened' : 'sliderMenu_isClosed'
        }`}
      >
        {isOpen ? (
          <VStack p={'20px'} minH={'100vh'} w={'100%'}>
            {children}
          </VStack>
        ) : null}
      </Box>
      <IconButton
        onClick={onToggle}
        variant={'ghost'}
        borderRadius={'0'}
        minW={'20px'}
        p={0}
        minH={'100vh'}
        aria-label=""
        icon={
          <IoIosArrowForward
            className={`slidemenuButton ${
              isOpen ? 'slidemenuButton_isOpen' : null
            }`}
          />
        }
      ></IconButton>
    </HStack>
  );
};

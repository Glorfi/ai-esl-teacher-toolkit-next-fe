import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { title } from 'process';
import { TbArrowsSort } from 'react-icons/tb';
import { sortBy } from '../model/sorting-options-router';

type SortingOption =
  | 'Update'
  | 'Popularity'
  | 'Newest to oldest'
  | 'Oldest to newest'
  | 'A-Z'
  | 'Z-A';

export const SortExerciseDropDown = (): JSX.Element => {
  const { isOpen, onOpen } = useDisclosure();
  const sortingState = useAppSelector((state) => state.sortingOption.sortby);
  const dispatch = useAppDispatch();
  const menuItems: SortingOption[] = [
    'Update',
    'Popularity',
    'Newest to oldest',
    'Oldest to newest',
    'A-Z',
    'Z-A',
  ];

  return (
    <Menu
      // isOpen={isOpen}
      gutter={-4}
      placement={'bottom-end'}
      matchWidth
      closeOnBlur
      closeOnSelect
    >
      <MenuButton
        as={Button}
        leftIcon={<TbArrowsSort />}
        rightIcon={<ChevronDownIcon />}
        variant={'outline'}
        color="primary.base"
        size={'xs'}
        fontSize={"sm"}
        borderColor={'primary.base'}
        _hover={{ background: 'unset' }}
        _active={{ background: 'unset' }}
        fontFamily={'alt'}
      >
        {`Sort by: ${sortingState}`}
      </MenuButton>
      <MenuList
        bgColor={'white'}
        borderColor={'primary.base'}
        minW={'100%'}
        p={'12px'}
        display={'flex'}
        flexDir={'column'}
        gap={'6px'}
        borderTopColor={'yellow'}
        borderTopWidth={0}
        borderTopRadius={0}
        fontFamily={'alt'}
        // borderTopLeftRadius={0}
        // borderTopRightRadius={0}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            fontSize={'sm'}
            fontWeight={item === sortingState ? 'bold' : 'medium'}
            color={'primary.base'}
            bgColor={'white'}
            p={0}
            _hover={{
              backgroundColor: 'unset',
              fontWeight: 'bold',
            }}
            _focus={{
              backgroundColor: 'unset',
            }}
            key={`soringMenuItem${index}`}
            onClick={() => setTimeout(() => dispatch(sortBy(item)), 100)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

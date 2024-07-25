'use client';
import { EXTERNAL_LINKS, HelpButton } from '@/shared';
import { HelpCenterIcon } from '@/shared/ui/icons/HelpCenterIcon';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { PiTelegramLogo } from 'react-icons/pi';

export const HelpWidget = (): JSX.Element => {
  return (
    <Menu closeOnBlur closeOnSelect>
      <MenuButton
        as={HelpButton}
        position={'fixed'}
        bottom={'16px'}
        right={'16px'}
      ></MenuButton>
      <MenuList
        minW={'160px'}
        bgColor={'white'}
        p={'14px'}
        display={'flex'}
        flexDir={'column'}
        gap={'8px'}
      >
        <MenuItem
          fontSize={'md'}
          fontWeight={'400'}
          p={0}
          _hover={{
            backgroundColor: 'unset',
            fontWeight: 'bold',
          }}
          _focus={{
            backgroundColor: 'unset',
          }}
          color={'primary.base'}
          as={"a"}
          href={EXTERNAL_LINKS.NOTION}
          target='blank'
        >
          <HelpCenterIcon mr={'8px'} />
          {/* <Icon as={icon} mr={'8px'} /> */}
          Support Portal
        </MenuItem>
        <MenuItem
          fontSize={'md'}
          fontWeight={'400'}
          p={0}
          _hover={{
            backgroundColor: 'unset',
            fontWeight: 'bold',
          }}
          _focus={{
            backgroundColor: 'unset',
          }}
          color={'primary.base'}
          as={"a"}
          href={EXTERNAL_LINKS.TELEGRAM}
          target='blank'
        >
          <Icon as={PiTelegramLogo} mr={'8px'} />
          Telegram Chat
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

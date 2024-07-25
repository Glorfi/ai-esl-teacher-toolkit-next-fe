'use client'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import React from 'react';
import { APP_PATHS } from '../../constants/AppPaths';
import { HamburgerIcon } from '@chakra-ui/icons';

export const MobileMenuMain = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label=""
        colorScheme="secondary"
        variant={'outline'}
        borderRadius={'40px'}
        onClick={onOpen}
        icon={<HamburgerIcon />}
        display={['inline-flex', 'none']}
      />

      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            gap={'16px'}
            padding={'8px 24px 24px'}
          >
            <Link
              href={APP_PATHS.MAIN}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Home
            </Link>
            <Link
              href={APP_PATHS.DASHBOARD}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Dashboard
            </Link>
            <Link
              href={'#'}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Profile
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

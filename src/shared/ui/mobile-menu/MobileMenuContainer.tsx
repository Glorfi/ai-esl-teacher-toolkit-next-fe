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
  Box,
  VStack,
} from '@chakra-ui/react';

import React from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';

export const MobileMenuContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOnCloseClick(e: React.MouseEvent) {
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof SVGElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLParagraphElement
    ) {
      return;
    }
    onClose();
  }

  return (
    <>
      <Box display={['inline-flex', 'none']}>
        <IconButton
          aria-label=""
          colorScheme="secondary"
          variant={'ghost'}
          color={'primary.base'}
          isRound
          onClick={onOpen}
          icon={<HamburgerIcon viewBox="0 0 24 24" w={'24px'} h={'24px'} />}
        />
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bgColor={'primary.base'} padding={'0 20px'}>
          <DrawerHeader>
            <DrawerCloseButton color={'white'} right={'28px'} />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
            width={'100%'}
            padding={0}
            position={'relative'}
          >
            <VStack
              w={'100%'}
              minH={'calc(100% - 50px)'}
              pb={'20px'}
              onClick={handleOnCloseClick}
            >
              {children}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

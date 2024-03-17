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
  Button,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';

import React, { useContext, useEffect, useState } from 'react';
import { APP_PATHS } from '../constants/AppPaths';
import { HamburgerIcon } from '@chakra-ui/icons';
import { SideBarMenu } from './SideBar/SideBar';
import { LSHandler } from '../utils/handleLocalStorage';

import { useDispatch, useSelector } from 'react-redux';
import { IExercise } from '../interfaces/exercise';
import { PiNotePencil } from 'react-icons/pi';
import { ExerciseThumbnail } from './SideBarExerciseThumbnail';
import { RootState } from '@/store/store';
import { Link } from '@chakra-ui/next-js';

export const MobileMenuDashBoard = (): JSX.Element => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const userData = useSelector((state: RootState) => state.user);
  const newExList = useSelector((state: RootState) => state.exerciseList);
  const dispatch = useDispatch();

  const [exercisesToDisplay, setExercisesToDisplay] = useState<IExercise[]>([]);

  useEffect(() => {
    const exsSorted = [...newExList].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setExercisesToDisplay(exsSorted);
  }, [newExList]);

  return (
    <>
      <Box display={['inline-flex', 'none']}>
        <IconButton
          aria-label=""
          colorScheme="secondary"
          variant={'outline'}
          borderRadius={'40px'}
          onClick={onOpen}
          icon={<HamburgerIcon />}
        />
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent bgColor={'primary'} padding={'0 20px'}>
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
            <VStack w={'100%'} minH={'calc(100% - 50px)'} pb={'20px'}>
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
              <Text
                fontSize={'14px'}
                color={'background'}
                fontWeight={'medium'}
                textAlign={'left'}
                w={'100%'}
                padding={'0 16px'}
              >
                Recent exercises:
              </Text>
              <VStack
                maxH={'calc(100vh - 174px)'}
                overflowY={'scroll'}
                className="thumbnailStack"
                w={'100%'}
              >
                {exercisesToDisplay?.map((ex) => {
                  return <ExerciseThumbnail data={ex} key={ex._id} />;
                })}
              </VStack>
              <HStack
                w={'100%'}
                as={'article'}
                justifyContent={'space-between'}
                minH={'max-content'}
                padding={'8px 12px 8px 16px'}
                _hover={{ backgroundColor: 'whiteOpacity.50' }}
                cursor={'pointer'}
                borderRadius={'0.375rem'}
                mt={'auto'}
              >
                <Text
                  fontSize={'16px'}
                  color={'background'}
                  fontWeight={'semibold'}
                >
                  {userData?.email || 'fasdfasdf'}
                </Text>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

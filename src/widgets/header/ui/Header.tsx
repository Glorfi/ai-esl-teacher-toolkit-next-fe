'use client';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Icon,
  IconButton,
  Slide,
  SlideFade,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import { useSelector } from 'react-redux';

import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetCurrentUserQuery } from '@/features/user/signin/api/auth';
import { RootState } from '@/app/lib/store/store';
import { APP_PATHS, MobileMenuMain } from '@/shared';
import { BookIcon } from '@/shared/ui/icons/BookIcon';
import { title } from 'process';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

interface ILink {
  link: string;
  title: string;
}

export const Header = (): JSX.Element => {
  const userData = useSelector((state: RootState) => state.user);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const { isLoading, isSuccess, isError } = useGetCurrentUserQuery(
    token ? token : skipToken
  );
  const links: ILink[] = [
    { link: '#AdvantagesSection', title: 'Advantages' },
    { link: '#HowToStartSection', title: 'How it works' },
    { link: '#ExerciseTypesSection', title: 'Exercises' },
    { link: '#NumbersSection', title: 'Numbers' },
    { link: '#FaqSection', title: 'FAQ' },
    { link: '#ContactsSection', title: 'Contact us' },
  ];

  const mobileMenu = useDisclosure();
  useEffect(() => {
    setIsRendered(true);
    setToken(LSHandler.getJwt());
  }, []);

  return (
    <>
      <HStack
        as={'header'}
        maxW={'1130px'}
        display={['none', 'none', 'none', 'flex']}
        justifyContent={'space-between'}
        w={'100%'}
        margin={'30px auto 0'}
        p={'12px 24px'}
        bgColor={'whiteAlpha.700'}
        backdropFilter={'blur(4px)'}
        borderRadius={'20px'}
        minHeight={'64px'}
        visibility={!isRendered ? 'hidden' : 'visible'}
        opacity={isLoading ? '0' : '1'}
        transition={'all 1s ease-in'}
        position={'sticky'}
        top={'30px'}
        zIndex={'500'}
        scrollBehavior={'smooth'}
      >
        <HStack
          cursor={'pointer'}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              window.location.hash = '';
            }, 500);
          }}
        >
          <BookIcon color={'primary.base'} />
          <Text
            fontFamily={'alt'}
            fontWeight={'bold'}
            textTransform={'uppercase'}
          >
            ESL Teacher Toolkit
          </Text>
        </HStack>
        <ButtonGroup display={['none', 'inline-flex']} gap={'12px'}>
          {links.map((link) => {
            return (
              <Link
                // as={'button'}
                key={link.title}
                href={link.link}
                color={'primary.base'}
                fontSize={'sm'}
                fontWeight={'bold'}
                cursor={'pointer'}
                _hover={{ textDecoration: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.link)
                    ?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    window.location.hash = link.link;
                  }, 500);
                }}
              >
                {link.title}
              </Link>
            );
          })}
        </ButtonGroup>

        {!userData ? (
          <ButtonGroup alignItems={'center'}>
            <Link href={APP_PATHS.SIGN_UP}>
              <Button
                variant={'solid'}
                colorScheme="primary"
                //borderRadius={'40px'}
              >
                Sign up
              </Button>
            </Link>
            <Link href={APP_PATHS.SIGN_IN}>
              <Button
                variant={'outline'}
                colorScheme="primary"
                //borderRadius={'40px'}
              >
                Log in
              </Button>
            </Link>
          </ButtonGroup>
        ) : (
          <ButtonGroup alignItems={'center'}>
            <Link href={APP_PATHS.DASHBOARD}>
              <Button
                w={'100%'}
                variant={'solid'}
                colorScheme="primary"
                //borderRadius={'40px'}
              >
                Dashboard
              </Button>
            </Link>
          </ButtonGroup>
        )}
      </HStack>
      <HStack
        w={'100%'}
        as={'menu'}
        display={['flex', 'flex', 'flex', 'none']}
        bgColor={'white'}
        m={0}
        minH={'68px'}
        borderBottom={'1px solid'}
        borderBottomColor={'gray.200'}
        padding={['0 26px']}
        justifyContent={'space-between'}
        position={'sticky'}
        zIndex={'500'}
        top={0}
      >
        <Text
          textTransform={'uppercase'}
          fontSize={['md', 'xl']}
          fontWeight={'bold'}
          fontFamily={'alt'}
          cursor={'pointer'}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            mobileMenu.onClose();
            setTimeout(() => {
              window.location.hash = '';
            }, 500);
          }}
        >
          ESL Teacher ToolKit
        </Text>
        <Box>
          <IconButton
            aria-label=""
            colorScheme="secondary"
            variant={'unstyled'}
            color={'primary.base'}
            isRound
            onClick={mobileMenu.onToggle}
            icon={
              mobileMenu.isOpen ? (
                <CloseIcon viewBox="0 0 24 24" w={'17px'} h={'17px'} />
              ) : (
                <HamburgerIcon viewBox="0 0 24 24" w={'24px'} h={'24px'} />
              )
            }
          />
        </Box>
      </HStack>
      <Slide
        direction="top"
        in={mobileMenu.isOpen}
        style={{ zIndex: 300, top: mobileMenu.isOpen ? 68 : 0 }}
      >
        <Card
          // opacity={mobileMenu.isOpen ? 1 : 0}
          variant={'unstyled'}
          position={'sticky'}
          top={68}
          minH={'200px'}
          bg={'white'}
          zIndex={500}
          borderRadius={0}
          h={'calc(100dvh - 68px)'}
        >
          <CardBody
            p={'64px 26px 0 '}
            display={'flex'}
            flexDirection={'column'}
            gap={'24px'}
          >
            {links.map((link) => {
              return (
                <Link
                  // as={'button'}
                  key={link.title}
                  href={link.link}
                  color={'primary.base'}
                  fontSize={'2xl'}
                  fontWeight={'bold'}
                  cursor={'pointer'}
                  _hover={{ textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.link)
                      ?.scrollIntoView({ behavior: 'smooth' });
                    mobileMenu.onClose();
                    setTimeout(() => {
                      window.location.hash = link.link;
                    }, 500);
                  }}
                >
                  {link.title}
                </Link>
              );
            })}
          </CardBody>
          <CardFooter p={'0 26px 32px'}>
            {!userData ? (
              <ButtonGroup
                alignItems={'center'}
                w={'100%'}
                justifyContent={'center'}
              >
                <Link href={APP_PATHS.SIGN_UP} w={'100%'}>
                  <Button
                    w={'100%'}
                    variant={'solid'}
                    colorScheme="primary"
                    //borderRadius={'40px'}
                  >
                    Sign up
                  </Button>
                </Link>
                <Link href={APP_PATHS.SIGN_IN} w={'100%'}>
                  <Button
                    w={'100%'}
                    variant={'outline'}
                    colorScheme="primary"
                    //borderRadius={'40px'}
                  >
                    Log in
                  </Button>
                </Link>
              </ButtonGroup>
            ) : (
              <ButtonGroup
                alignItems={'flex-start'}
                w={'100%'}
                justifyContent={'flex-start'}
              >
                <Link href={APP_PATHS.DASHBOARD}>
                  <Button
                    w={'100%'}
                    variant={'solid'}
                    colorScheme="primary"
                    //borderRadius={'40px'}
                  >
                    Dashboard
                  </Button>
                </Link>
              </ButtonGroup>
            )}
          </CardFooter>
        </Card>
      </Slide>
    </>
  );
};

'use client';
import { Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';

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
  useEffect(() => {
    setIsRendered(true);
    setToken(LSHandler.getJwt());
  }, []);

  return (
    <HStack
      as={'header'}
      maxW={'1130px'}
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
      <HStack>
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
      <MobileMenuMain />
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
      ) : null}
    </HStack>
  );
};

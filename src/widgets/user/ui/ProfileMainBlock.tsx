'use client';
import { resetExerciseList } from '@/entities/exercise';
import { clearUser } from '@/entities/user';
import { APP_PATHS } from '@/shared';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { Button, Card, CardBody, HStack, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { IoExitSharp, IoServer } from 'react-icons/io5';

export const ProfileMainBlock = (): JSX.Element => {
  const userEmail = useAppSelector((state) => state.user?.email);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = LSHandler.clearJwt;

  function handleLogOut() {
    logout();
    router.push(APP_PATHS.MAIN);
    setTimeout(() => {
      dispatch(clearUser());
      dispatch(resetExerciseList());
    }, 500);

    //window.location.reload()
  }

  // useEffect(()=> {

  // }, [])
  return (
    <Card w={'100%'} maxW={'368px'} mt={['20px', '20px', '20px', '144px']}>
      <CardBody p={'34px'} display={'flex'} flexDir={'column'}>
        <Text fontSize={'md'} fontWeight={'bold'}>
          Basic Details
        </Text>
        <HStack justifyContent={'space-between'} mt={'24px'}>
          <Text fontSize={'sm'} fontWeight={'500'}>
            Email
          </Text>
          <Text fontSize={'sm'} fontWeight={'500'}>
            {userEmail}
          </Text>
        </HStack>
        <Card mt={'14px'} variant={'outline'} boxShadow={'none'}>
          <CardBody
            display={'flex'}
            alignItems={'center'}
            gap={'8px'}
            p={'12px'}
          >
            <Icon as={IoServer} color={'primary'} boxSize={'20px'} />
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text fontWeight={'semibold'}>Balance</Text>
              <Text>1900</Text>
            </HStack>
          </CardBody>
        </Card>
        <Button
          colorScheme="highlight"
          variant={'outline'}
          size={'sm'}
          m={'24px 0 0 auto'}
          rightIcon={<IoExitSharp />}
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </CardBody>
    </Card>
  );
};

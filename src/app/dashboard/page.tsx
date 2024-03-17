'use client';
import ExerciseForm from '@/components/ExerciseForm';
import { SideBarMenu } from '@/components/SideBar/SideBar';
import { Box, HStack, Text } from '@chakra-ui/react';

import { useState } from 'react';

const DashboardPage = (): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <Box minH={'100vh'}>
      <HStack alignItems={'flex-start'} w={'100%'}>
        <SideBarMenu isOpen={isSideBarOpen} onToggle={toggleSideBar} />
        <HStack
          marginLeft={'auto'}
          flexDirection={['column', 'column']}
          minH={'100vh'}
          alignItems={['flex-start', 'center']}
          w={['100%', `${isSideBarOpen ? 'calc(100% - 320px)' : '100%'}`]}
          justifyContent={['flex-start', 'center']}
          padding={['20px', '0']}
        >
          {/* <MobileMenuDashBoard /> */}
          <ExerciseForm />
        </HStack>
      </HStack>
    </Box>
  );
};
export default DashboardPage;

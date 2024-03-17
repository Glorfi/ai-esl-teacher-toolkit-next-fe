'use client';

import { MobileMenuDashBoard } from '@/components/MobileMenuDashboard';
import { SideBarMenu } from '@/components/SideBar/SideBar';
import { APP_PATHS } from '@/constants/AppPaths';
import { trimIdFromPath } from '@/utils/trimIdFromPathname';
import { Box, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const pathname = usePathname();

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
          justifyContent={['flex-start']}
          padding={['20px', '0']}
        >
          {children}
          <MobileMenuDashBoard />
        </HStack>
      </HStack>
    </Box>
  );
};

export default ClientDashboardLayout;

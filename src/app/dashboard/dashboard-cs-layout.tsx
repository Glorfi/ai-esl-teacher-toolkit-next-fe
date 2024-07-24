'use client';
import { WorkspaceHeader } from '@/widgets/header';
import {
  MobileMenuDashBoard,
  MobileMenuUserLibrary,
} from '@/widgets/mobile-menu';
import { SidebarDashboardWithRecentEx } from '@/widgets/sidebar-dashboard';
import { HelpWidget } from '@/widgets/user';

import { Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';

const ClientDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <Box minH={'100vh'}>
      <HStack alignItems={'flex-start'} w={'100%'}>
        <SidebarDashboardWithRecentEx
          isOpen={isSideBarOpen}
          onToggle={toggleSideBar}
        />

        <HStack
          marginLeft={'auto'}
          flexDirection={['column', 'column']}
          minH={'100vh'}
          alignItems={['flex-start', 'center']}
          transition={'width 0.2s ease-in'}
          w={['100%', `${isSideBarOpen ? 'calc(100% - 320px)' : '100%'}`]}
          justifyContent={['flex-start']}
          //  padding={['20px', '0']}
          gap={0}
        >
          <WorkspaceHeader mobileMenu={<MobileMenuDashBoard />} />
          {children}
        </HStack>
      </HStack>
      <HelpWidget />
    </Box>
  );
};

export default ClientDashboardLayout;

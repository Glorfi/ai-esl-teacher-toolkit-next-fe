import { Link } from '@chakra-ui/next-js';
import { Text, HStack, Box } from '@chakra-ui/react';

export const FooterSection = (): JSX.Element => {
  return (
    <HStack
      as={'footer'}
      m={'156px auto 0'}
      maxW={'1130px'}
      //padding={['0 20px', '0 20px', '0 20px', '0']}
      p={'24px 0'}
      borderTop={'1px solid #E2E8F0'}
      justifyContent={'space-between'}
    >
      <Text fontSize={'xs'}>Copyright © 2024 ESL Teacher ToolKit</Text>
      <HStack>
        <Link href={'#'} fontSize={'xs'} color={'primary.base'}>
          Privacy Policy
        </Link>
        <Link href={'#'} fontSize={'xs'} color={'primary.base'}>
          Cookie preferences
        </Link>
      </HStack>
    </HStack>
  );
};

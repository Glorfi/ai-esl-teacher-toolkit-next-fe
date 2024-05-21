import {Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import { MdOutlineAutoGraph } from 'react-icons/md';

export const WorkspaceHeader = (): JSX.Element => {
  return (
    <HStack
      w={'100%'}
      minH={'68px'}
      borderBottom={'1px solid'}
      borderBottomColor={'gray.200'}
      padding={['0 36px 0 56px']}
      justifyContent={'space-between'}
    >
      <Text
        textTransform={'uppercase'}
        fontSize={'xl'}
        fontWeight={'bold'}
        fontFamily={'alt'}
      >
        ESL Teacher ToolKit
      </Text>
      <Button
        colorScheme="primary"
        fontFamily={'alt'}
        pt={"8px"}
        pb={"8px"}
        rightIcon={
          <Box
            w={'24px'}
            h={'24px'}
            bgColor={'whiteOpacity.100'}
            borderRadius={'full'}
            p={'6.5px 5px'}
            display={'flex'}
            alignItems={'center'}
          >
            <Icon
              as={MdOutlineAutoGraph}
              boxSize={'14px'}
              color={'background'}

              // p={'6.5px 5px'}
            />
          </Box>
        }
      >
        Upgrade plan
      </Button>
    </HStack>
  );
};

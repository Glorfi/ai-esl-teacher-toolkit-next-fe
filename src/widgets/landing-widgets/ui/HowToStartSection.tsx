import {
  VStack,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  Grid,
  Box,
  ListItem,
  UnorderedList,
  ListIcon,
  List,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import { IoMdCheckmark } from 'react-icons/io';
import step1 from '../../../../public/step1.png';
import step2 from '../../../../public/step2.png';
import step3 from '../../../../public/step3.png';
import step4 from '../../../../public/step4.png';
import { Link } from '@chakra-ui/next-js';
import NextLink from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { APP_PATHS } from '@/shared';

export const HowToStartSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'128px'}
      w={'100%'}
    >
      <Text
        as="h2"
        color={'primary.base'}
        fontSize={['2xl', '64px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Don't know how to start?
      </Text>
      <Tabs
        w={'100%'}
        align="center"
        variant="soft-rounded"
        colorScheme="secondary"
        mt={'48px'}
      >
        <TabList>
          <Tab>Fill in the details</Tab>
          <Tab>Generate Exercise</Tab>
          <Tab>Edit it</Tab>
          <Tab>Send to student</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
            >
              <Box w={'50%'} p={'36px'} alignItems={'flex-start'}>
                <Text
                  fontSize={'32px'}
                  fontWeight={'bold'}
                  textAlign={'start'}
                  lineHeight={'100%'}
                >
                  Fill in the required fields to generate the exercise
                </Text>
                <List mt={'24px'} textAlign={'start'} color={'primary.base'}>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    Choose the skill you want to practice (e.g.,Vocabulary).
                  </ListItem>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    Select the type of exercise: Fill-in-Gaps or Multiple
                    Choice.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    Enter the list of words you want your student to practice.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    Choose the appropriate level and age group for your student.
                  </ListItem>
                </List>
              </Box>
              <Image
                src={step1}
                // priority={true}
                alt="app-interface step 1"
                style={{
                  width: '50%',
                }}
              />
            </Card>
          </TabPanel>
          <TabPanel>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              bgColor={'secondary.base'}
            >
              <Box w={'50%'} p={'36px'} alignItems={'flex-start'}>
                <Text
                  fontSize={'32px'}
                  fontWeight={'bold'}
                  textAlign={'start'}
                  lineHeight={'100%'}
                  color={'white'}
                >
                  Generate the Exercise
                </Text>
                <Text mt={'24px'} textAlign={'start'} color={'white'}>
                  Once the form is completed, click the “Generate exercise”
                  button. You can edit it or add some information once exercise
                  is generated.
                </Text>
              </Box>
              <Image
                src={step2}
                // priority={true}
                alt="app-interface step 1"
                style={{
                  width: '50%',
                }}
              />
            </Card>
          </TabPanel>
          <TabPanel>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
            >
              <Box w={'50%'} p={'36px'} alignItems={'flex-start'}>
                <Text
                  fontSize={'32px'}
                  fontWeight={'bold'}
                  textAlign={'start'}
                  lineHeight={'100%'}
                >
                  Add topic and edit exercise
                </Text>
                <List mt={'24px'} textAlign={'start'} color={'primary.base'}>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    At the bottom of the editor tab, add relevant topics to your
                    exercise for easier access later.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={IoMdCheckmark} />
                    Edit it if it’s necessary.
                  </ListItem>
                </List>
              </Box>
              <Image
                src={step3}
                // priority={true}
                alt="app-interface step 1"
                style={{
                  width: '50%',
                }}
              />
            </Card>
          </TabPanel>
          <TabPanel>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              bgColor={'secondary.base'}
            >
              <Box w={'50%'} p={'36px'} alignItems={'flex-start'}>
                <Text
                  fontSize={'32px'}
                  fontWeight={'bold'}
                  textAlign={'start'}
                  lineHeight={'100%'}
                  color={'white'}
                >
                  Send to student
                </Text>
                <Text mt={'24px'} textAlign={'start'} color={'white'}>
                  After checking, send the link to the exercise to the student.
                </Text>
                <Box mt={'32px'} textAlign={'left'}>
                  <Link
                    as={NextLink}
                    href={APP_PATHS.SIGN_UP}
                    color={'primary.base'}
                  >
                    <Button
                      variant={'solid'}
                      rightIcon={<FaArrowRightLong />}
                      color={'primary.base'}
                    >
                      Let's start
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Image
                src={step4}
                // priority={true}
                alt="app-interface step 1"
                style={{
                  width: '50%',
                }}
              />
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

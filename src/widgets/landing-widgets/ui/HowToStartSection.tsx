//import '../../../shared/ui/animations/slide-fade.css'
import '@/shared/ui/animations/slide-fade.css';
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
  SlideFade,
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
import { useAppSelector } from '@/shared/hooks/hooks';

export const HowToStartSection = (): JSX.Element => {
  const userData = useAppSelector((state) => state.user);
  return (
    <VStack
      as={'section'}
      id="HowToStartSection"
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={['116px', '116px', '128px']}
      w={'100%'}
      scrollMarginTop={'94px'}
    >
      <Text
        as="h2"
        color={'primary.base'}
        fontSize={['32px', '32px', '64px']}
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
        mt={['32px', '32px', '48px']}
      >
        <TabList
          gap={'16px'}
          as={'ul'}
          overflow={['scroll', 'scroll', 'hidden']}
          justifyContent={['flex-start', 'flex-start', 'center']}
          whiteSpace={'nowrap'}
        >
          <Tab
            backgroundColor={'grayAlt'}
            color={'primary.base'}
            _selected={{ backgroundColor: 'secondary.base', color: 'white' }}
          >
            &#x2022; Fill in the details
          </Tab>
          <Tab
            backgroundColor={'grayAlt'}
            color={'primary.base'}
            _selected={{ backgroundColor: 'secondary.base', color: 'white' }}
          >
            &#x2022; Generate exercise
          </Tab>
          <Tab
            backgroundColor={'grayAlt'}
            color={'primary.base'}
            _selected={{ backgroundColor: 'secondary.base', color: 'white' }}
          >
            &#x2022; Edit it
          </Tab>
          <Tab
            backgroundColor={'grayAlt'}
            color={'primary.base'}
            _selected={{ backgroundColor: 'secondary.base', color: 'white' }}
          >
            &#x2022; Send to student
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} mt={'24px'}>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              className="slideFadeDown"
              minH={['404px', '404px', 'unset']}
            >
              <Box
                w={['100%', '100%', '50%']}
                p={['24px', '24px', '36px']}
                alignItems={'flex-start'}
              >
                <Text
                  fontSize={['2xl', '32px']}
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
              <Box w={'50%'} display={['none', 'none', 'block']}>
                <Image
                  src={step1}
                  // priority={true}
                  alt="app-interface step 1"
                />
              </Box>
            </Card>
          </TabPanel>
          <TabPanel p={0} mt={'24px'}>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              bgColor={'secondary.base'}
              className="slideFadeDown"
              // minH={['404px', '404px', 'unset']}
              minH={['404px', '404px', 'unset']}
            >
              <Box
                w={['100%', '100%', '50%']}
                p={['24px', '24px', '36px']}
                alignItems={'flex-start'}
              >
                <Text
                  fontSize={['2xl', '32px']}
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
              <Box w={'50%'} display={['none', 'none', 'block']}>
                <Image
                  src={step2}
                  // priority={true}
                  alt="app-interface step 1"
                />
              </Box>
            </Card>
          </TabPanel>
          <TabPanel p={0} mt={'24px'}>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              className="slideFadeDown"
              minH={['404px', '404px', 'unset']}
            >
              <Box
                w={['100%', '100%', '50%']}
                p={['24px', '24px', '36px']}
                alignItems={'flex-start'}
              >
                <Text
                  fontSize={['2xl', '32px']}
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
              <Box w={'50%'} display={['none', 'none', 'block']}>
                <Image
                  src={step3}
                  // priority={true}
                  alt="app-interface step 1"
                />
              </Box>
            </Card>
          </TabPanel>
          <TabPanel p={0} mt={'24px'}>
            <Card
              variant={'outline'}
              flexDirection={'row'}
              borderRadius={16}
              overflow={'hidden'}
              bgColor={'secondary.base'}
              className="slideFadeDown"
              minH={['404px', '404px', 'unset']}
            >
              <Box
                w={['100%', '100%', '50%']}
                p={['24px', '24px', '36px']}
                alignItems={'flex-start'}
              >
                <Text
                  fontSize={['2xl', '32px']}
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
                    href={userData ? APP_PATHS.DASHBOARD : APP_PATHS.SIGN_UP}
                    color={'primary.base'}
                  >
                    <Button
                      variant={'solid'}
                      rightIcon={<FaArrowRightLong />}
                      color={'primary.base'}
                    >
                      {userData ? "Go to dashboard" : "Let's start!"}
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Box w={'50%'} display={['none', 'none', 'block']}>
                <Image
                  src={step4}
                  // priority={true}
                  alt="app-interface step 1"
                />
              </Box>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

import Image from 'next/image';
import grammarEx from '../../../../public/grammar-ex-pic.png';
import readingEX from '../../../../public/reading-ex-pic.png';
import '../../../shared/ui/animations/textScrollLeft.css';
import {
  VStack,
  Text,
  Grid,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Box,
} from '@chakra-ui/react';

export const ExerciseTypesSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'156px'}
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
        What exercises you can generate
      </Text>
      <Text
        mt={'16px'}
        as="h3"
        color={'primary.base'}
        fontSize={['md', '20px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Maximize your teaching efficiency with our exercise generation Platform.
      </Text>
      <Grid
        mt={'48px'}
        gridTemplateColumns={'1fr 1fr 1fr'}
        gap={'24px'}
        minH={'394px'}
        overflow={'hidden'}
      >
        <Card variant={'landingDark'} overflow={'hidden'}>
          <CardBody p={'32px'}>
            <Text
              as={'h4'}
              fontWeight={'bold'}
              fontSize={'2xl'}
              color={'inherit'}
            >
              Vocabulary exercises
            </Text>
            <Text fontWeight={'500'} mt={'12px'} color={'inherit'}>
              Design tasks focused on the lexical units you want your students
              to master.
            </Text>
          </CardBody>
          <CardFooter p={0} position={'relative'}>
            <Text
              p={'8px 24px'}
              borderRadius={'30px'}
              bgColor={'grayAlt'}
              fontWeight={'bold'}
              transform={'rotate(-30deg)'}
              position={'absolute'}
              bottom={'10'}
              left={'10px'}
            >
              Responsibility
            </Text>
            <Text
              p={'8px 24px'}
              borderRadius={'30px'}
              bgColor={'grayAlt'}
              fontWeight={'bold'}
              transform={'rotate(15deg)'}
              position={'absolute'}
              bottom={'88px'}
              left={'148px'}
            >
              School
            </Text>{' '}
            <Text
              p={'8px 24px'}
              borderRadius={'30px'}
              bgColor={'grayAlt'}
              fontWeight={'bold'}
              transform={'rotate(15deg)'}
              position={'absolute'}
              bottom={'-5px'}
              left={'115px'}
            >
              Vacation
            </Text>
            <Text
              p={'8px 24px'}
              borderRadius={'30px'}
              bgColor={'grayAlt'}
              fontWeight={'bold'}
              transform={'rotate(-30deg)'}
              position={'absolute'}
              bottom={'40px'}
              left={'222px'}
            >
              Education
            </Text>
            <Text
              p={'8px 24px'}
              borderRadius={'30px'}
              bgColor={'grayAlt'}
              fontWeight={'bold'}
              transform={'rotate(15deg)'}
              position={'absolute'}
              bottom={'110px'}
              left={'290px'}
            >
              Shopping
            </Text>
          </CardFooter>
        </Card>
        <Card variant={'landingLight'} _hover={{ bgColor: 'unset' }} p={'0'}>
          <CardHeader p={'32px 32px 0'} opacity={'0.5'}>
            <Text
              as={'h4'}
              fontWeight={'bold'}
              fontSize={'2xl'}
              color={'inherit'}
            >
              Grammar exercises
            </Text>
            <Text fontWeight={'500'} mt={'12px'} color={'inherit'}>
              Make an exercise on the desired topic and grammar rules.
            </Text>
          </CardHeader>
          <CardBody p={0} display={'flex'} mt={'70px'} w={'100%'}>
            <Box className="scroll-left" bgColor={'highlight.base'}>
              <Text
                fontSize={'xl'}
                color={'white'}
                fontWeight={'bold'}
                overflow={'visible'}
                whiteSpace={'nowrap'}
              >
                Will be available soon... Will be available soon... Will be
                available soon...
              </Text>
            </Box>
          </CardBody>
          <CardFooter p={'0 32px 32px'} opacity={'0.5'}>
            <Image src={grammarEx} alt="grammar exercises" />
          </CardFooter>
        </Card>
        <Card variant={'landingLight'} _hover={{ bgColor: 'unset' }} p={'0'}>
          <CardHeader p={'32px 32px 0'} opacity={'0.5'}>
            <Text
              as={'h4'}
              fontWeight={'bold'}
              fontSize={'2xl'}
              color={'inherit'}
            >
              Reading
            </Text>
            <Text fontWeight={'500'} mt={'12px'} color={'inherit'}>
              Create or adapt texts, extract useful vocabulary in seconds and
              much more.
            </Text>
          </CardHeader>
          <CardBody p={0} display={'flex'} w={'100%'} mt={'70px'}>
            <Box className="scroll-left" bgColor={'highlight.base'}>
              <Text
                fontSize={'xl'}
                color={'white'}
                fontWeight={'bold'}
                overflow={'visible'}
                whiteSpace={'nowrap'}
              >
                Will be available soon... Will be available soon... Will be
                available soon...
              </Text>
            </Box>
          </CardBody>
          <CardFooter p={'0 32px 32px'} opacity={'0.5'}>
            <Image src={readingEX} alt="reading exercises" />
          </CardFooter>
        </Card>
      </Grid>
    </VStack>
  );
};

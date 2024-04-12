'use client';
import {
  Card,
  CardBody,
  OrderedList,
  ListItem,
  CardHeader,
  Button,
  Text,
  CardFooter,
  ButtonGroup,
  Box,
} from '@chakra-ui/react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { shuffleArray } from '../lib/shuffleArray';
import { ISentence, SentenceInput } from '@/entities/sentence';

interface IExerciseSentenceInput {
  sentenceList: ISentence[];
  taskDescription: string | undefined;
  isRandomOrderEnabled: boolean | undefined;
}

export const ExerciseSentenceInput = (props: IExerciseSentenceInput) => {
  const [exsData, setExsData] = useState<ISentence[]>(props.sentenceList);
  const [hintsList, setHintsList] = useState<string[]>(['']);
  const [isCheckActive, setIsCheckActive] = useState<boolean>(false);
  const [validAnswersList, setValidAnswersList] = useState<boolean[]>([]);
  const [score, setScore] = useState<string>('');

  function handleShuffleClick() {
    const shuffledArray = shuffleArray([...props.sentenceList]);
    setExsData(shuffledArray);
    console.log('New exsData:', exsData);
  }
  const handleValidityChange = (index: number, isValid: boolean) => {
    setValidAnswersList((prevValidityArray) => {
      const newValidityArray = [...prevValidityArray];
      newValidityArray[index] = isValid;
      return newValidityArray;
    });
  };
  useEffect(() => {
    const hintArr = props.sentenceList.map((item) => {
      return item.hint;
    });
    const shuffledHints = shuffleArray([...hintArr]);
    setHintsList(shuffledHints);
    if (props.isRandomOrderEnabled) {
      const arr = shuffleArray([...props.sentenceList]);
      setExsData(arr);
    }
  }, [props.sentenceList, props.isRandomOrderEnabled]);

  useEffect(() => {
    const qCounter = exsData.length;
    const correctAnswersCounter = validAnswersList.filter(
      (item) => item === true
    ).length;

    setScore(`${correctAnswersCounter} / ${qCounter}`);
  }, [validAnswersList]);

  return (
    <Card w={'100%'} maxW={'800px'}>
      <CardHeader p={'20px 20px 0'}>
        <Text color={'primary'} fontWeight={'bold'}>
          {props.taskDescription ? props.taskDescription : 'No description'}
        </Text>
        <Box
          w={'100%'}
          mt={'8px'}
          display={'inline-flex'}
          border={'1px solid'}
          borderColor={'highlight'}
          borderRadius={'8px'}
          p={'8px'}
        >
          {hintsList.map((item, index) => {
            if (index === hintsList.length - 1) {
              return (
                <Text
                  key={`answer${index}`}
                  mr={'4px'}
                  color={'secondary.base'}
                >{`${item}${' '}`}</Text>
              );
            }
            return (
              <Text
                key={`answer${index}`}
                mr={'4px'}
                color={'secondary.base'}
              >{`${item},${' '}`}</Text>
            );
          })}
        </Box>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'} gap={'16px'}>
        <OrderedList spacing={'4px'}>
          {exsData.map((item, index) => {
            return (
              <ListItem key={`list-${index}`}>
                <SentenceInput
                  sentence={item}
                  key={`sentence-${index}`}
                  isCheckActive={isCheckActive}
                  onValidityChange={(valid) => {
                    handleValidityChange(index, valid);
                  }}
                />
              </ListItem>
            );
          })}
        </OrderedList>
      </CardBody>
      <CardFooter
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup>
          <Button
            colorScheme={'highlight'}
            size={'sm'}
            variant={'outline'}
            onClick={() => setIsCheckActive(true)}
            rightIcon={<IoMdCheckmarkCircleOutline />}
          >
            Check Answers
          </Button>
          <Button
            rightIcon={<GrPowerReset />}
            colorScheme={'highlight'}
            size={'sm'}
            variant={'outline'}
            onClick={() => setIsCheckActive(false)}
            aria-label={''}
          >
            Reset Checking
          </Button>
        </ButtonGroup>
        <Text display={isCheckActive ? 'block' : 'none'}>Score: {score}</Text>
      </CardFooter>
    </Card>
  );
};

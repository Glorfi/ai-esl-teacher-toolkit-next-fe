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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { GrPowerReset } from 'react-icons/gr';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { ISentence, SentenceSelectInput } from '@/entities/sentence';
import { shuffleArray } from '../lib/shuffleArray';
import { CheckboxIcon } from '@/shared/ui/icons/CheckBox';
import { ResetIcon } from '@/shared/ui/icons/ResetIcon';

interface IExerciseSelectInput {
  sentenceList: ISentence[];
  taskDescription: string | undefined;
  isRandomOrderEnabled: boolean | undefined;
}

export const ExerciseSelectInput = (props: IExerciseSelectInput) => {
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
    console.log(props.isRandomOrderEnabled);
    if (props.isRandomOrderEnabled) {
      const arr = shuffleArray([...props.sentenceList]);
      const hintArr = props.sentenceList.map((item) => {
        return item.hint;
      });
      const shuffledHints = shuffleArray([...hintArr]);
      setExsData(arr);
      setHintsList(shuffledHints);
    }
  }, [props.sentenceList, props.isRandomOrderEnabled]);

  useEffect(() => {
    const qCounter = exsData.length;
    const correctAnswersCounter = validAnswersList.filter(
      (item) => item === true
    ).length;

    setScore(`${correctAnswersCounter} / ${qCounter}`);
  }, [validAnswersList]);

  useEffect(() => {
    console.log(exsData);
  }, []);

  return (
    <Card w={'100%'} maxW={'800px'} variant={'outline'}>
      <CardHeader p={'20px 20px 0'}>
        <Text color={'primary.base'} fontWeight={'bold'}>
          {props.taskDescription ? props.taskDescription : 'No description'}
        </Text>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'} gap={'16px'}>
        <OrderedList spacing={'4px'}>
          {exsData.map((item, index) => {
            return (
              <ListItem key={`list-${index}`}>
                <SentenceSelectInput
                  sentence={item}
                  isCheckActive={isCheckActive}
                  onValidityChange={(valid) =>
                    handleValidityChange(index, valid)
                  }
                />
              </ListItem>
            );
          })}
        </OrderedList>
      </CardBody>
      <CardFooter
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup>
          <Button
            colorScheme={'secondary'}
            size={'md'}
            variant={'solid'}
            onClick={() => setIsCheckActive(true)}
            leftIcon={<CheckboxIcon />}
          >
            Check answers
          </Button>
          <Button
            leftIcon={<ResetIcon />}
            colorScheme={'secondary'}
            size={'md'}
            variant={'outline'}
            onClick={() => setIsCheckActive(false)}
            aria-label={''}
          >
            Reset checking
          </Button>
        </ButtonGroup>
        <Text mt={['16px', 0]} display={isCheckActive ? 'block' : 'none'}>
          Score: {score}
        </Text>
      </CardFooter>
    </Card>
  );
};

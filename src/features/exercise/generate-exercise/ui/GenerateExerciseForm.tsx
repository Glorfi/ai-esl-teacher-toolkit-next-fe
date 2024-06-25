'use client';
import {
  RadioGroup,
  HStack,
  Radio,
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  VStack,
  Select,
  Tooltip,
  Textarea,
  useToast,
  Switch,
  IconButton,
} from '@chakra-ui/react';
import { BsInfoCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { customError } from '../../../../shared/constants/customError';
import { useRouter } from 'next/navigation';

import {
  addValues,
  resetForm,
} from '@/features/exercise/generate-exercise/model/exercise-form-router';
import { addExercise } from '@/entities/exercise';
import { APP_PATHS } from '@/shared';

import { useAppSelector } from '@/shared/hooks/hooks';

import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useGenerateExerciseMutation } from '../api/generateExercise';
import { IFormValues } from '../model/types';
import { useGeneratePrompt } from '../lib/generatePrompt';
import { getStudentAgeMapped } from '../lib/getStudentAgeMapped';
import { getStudentLevelMapped } from '../lib/getStudentLevelMapped';

export const GenerateExerciseForm = (): JSX.Element => {
  const initialFormValues = useAppSelector((state) => state.exerciseForm);
  const [token, setToken] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<IFormValues>(initialFormValues);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const [generateExercise, { isLoading, error, data: createdExercise }] =
    useGenerateExerciseMutation();

  function handleSendMessage() {
    dispatch(addValues(formValues));
    generateExercise({
      token,
      body: {
        type: formValues.taskType,
        skill: formValues.skill,
        studentAge: getStudentAgeMapped(formValues.learnerAge),
        studentLevel: getStudentLevelMapped(formValues.learnerLevel),
        prompt: prompt,
        isStrictChecking: formValues.isStrictChecking,
      },
    });
  }
  const prompt = useGeneratePrompt(
    formValues.skill,
    formValues.taskType,
    formValues.wordList,
    formValues.learnerLevel,
    formValues.learnerAge
  );

  const checkFormValidity = () => {
    const requiredFields = [
      'skill',
      'taskType',
      'wordList',
      'learnerLevel',
      'learnerAge',
    ];
    for (const key of requiredFields) {
      if (formValues[key as keyof IFormValues] === '') {
        setIsFormValid(false);
        return;
      }
    }
    setIsFormValid(true);
  };

  useEffect(() => {
    console.log(prompt);
  }, [prompt, formValues]);

  useEffect(() => {
    if (createdExercise) {
      dispatch(addExercise(createdExercise));
      dispatch(resetForm());
      router.push(
        `${APP_PATHS.DASHBOARD_EXERCISE.replace(':id', '')}${
          createdExercise._id
        }`
      );
    }
  }, [createdExercise]);

  useEffect(() => {
    checkFormValidity();
  }, [formValues]);

  useEffect(() => {
    if (error) {
      const customError = error as customError;
      const { code, message } = customError.data;
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  useEffect(() => {
    setToken(LSHandler.getJwt());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  return (
    <Card bgColor={'background'}>
      <CardBody display="flex" gap={'8px'} flexDirection={'column'}>
        <Text fontSize={'lg'}>Choose the skill:</Text>
        <RadioGroup
          colorScheme={'secondary'}
          name="skill"
          value={formValues.skill}
          onChange={(value) => setFormValues({ ...formValues, skill: value })}
        >
          <HStack>
            <Radio value="vocabulary">Vocabulary</Radio>
            <Radio value="grammar" isDisabled>
              Grammar
            </Radio>
            <Radio value="reading" isDisabled>
              Reading
            </Radio>
          </HStack>
        </RadioGroup>
        <Text fontSize={'lg'}>Type of exercise</Text>
        <RadioGroup
          name="task-type"
          colorScheme={'secondary'}
          value={formValues.taskType}
          onChange={(value) =>
            setFormValues({ ...formValues, taskType: value })
          }
        >
          <HStack>
            <Radio value="fillInGaps">Fill-in-gaps</Radio>
            <Radio value="multipleChoice">Multiple Choice</Radio>
            <Radio value="reading" isDisabled>
              Guessing the meaning
            </Radio>
          </HStack>
        </RadioGroup>
        <VStack alignItems={'flex-start'} spacing={0}>
          <Text fontSize={'lg'}>Words to practice</Text>
          <Text fontSize={'2xs'}>type words separeted by comas</Text>
        </VStack>
        <Textarea
          colorScheme="secondary"
          value={formValues.wordList}
          onChange={(e) =>
            setFormValues({ ...formValues, wordList: e.target.value })
          }
        />
        <Text fontSize={'lg'}>Learner's level</Text>
        <Select
          // defaultValue={'B1'}
          value={formValues.learnerLevel}
          onChange={(e) =>
            setFormValues({ ...formValues, learnerLevel: e.target.value })
          }
        >
          <option value={'A1'}>Beginner A1</option>
          <option value={'A2'}>Elementary A2</option>
          <option value={'B1'}>Intermediate B1</option>
          <option value={'B2'}>Upper-Intermediate B2</option>
          <option value={'C1'}>Advanced C1</option>
        </Select>
        <Text fontSize={'lg'}>Learner's age</Text>
        <Select
          //  defaultValue={'adults'}
          value={formValues.learnerAge}
          onChange={(e) =>
            setFormValues({ ...formValues, learnerAge: e.target.value })
          }
        >
          <option value={'children'}>Children 7-12 y.o.</option>
          <option value={'teenagers'}>Teenagers 13-20 y.o.</option>
          <option value={'adults'}>Adults 20+ y.o</option>
        </Select>
        <HStack>
          <Tooltip
            hasArrow
            label="If disabled, you might have to edit exercise later, its answer an options to make it work properly for students"
            placement="top"
          >
            <IconButton
              aria-label="info"
              icon={<BsInfoCircle />}
              isRound
              size={'sm'}
              variant={'ghost'}
              colorScheme="secondary"
              p={0}
            />
          </Tooltip>
          <Text fontSize={'medium'}>Enable strict checking?</Text>
          <Switch
            colorScheme="secondary"
            defaultChecked
            checked={formValues.isStrictChecking}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                isStrictChecking: e.target.checked,
              })
            }
          />
        </HStack>
      </CardBody>
      <CardFooter justifyContent={'center'}>
        {' '}
        <Tooltip
          hasArrow
          label="It might take 5-10 seconds"
          placement={'top'}
          display={isLoading ? 'block' : 'none'}
        >
          <Button
            variant={'outline'}
            colorScheme={'secondary'}
            onClick={handleSendMessage}
            isLoading={isLoading}
            loadingText={'Generating...'}
            isDisabled={!isFormValid}
          >
            Generate the exericse!
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

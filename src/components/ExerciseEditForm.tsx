import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ButtonGroup,
  Text,
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  HStack,
  Icon,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { IExercise } from '../interfaces/exercise';
import { IoIosCheckmark, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { SentenceEditForm } from './SentenceEditForm';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateExerciseMutation } from '../store/main-api/mutations/updateExercise';
import { useDebounce } from '../utils/useDebounce';
import { LSHandler } from '../utils/handleLocalStorage';
import { useDispatch } from 'react-redux';
import { replaceExercise } from '../store/exerciseList/exercise-list-router';
import { CheckIcon } from '@chakra-ui/icons';
import { BadgeUpdating } from './BadgeUpdating';
import { setIsEditing } from '../store/isEditing/isEditing-router';

interface IExerciseEditForm {
  exercise: IExercise;
}

export const ExerciseEditForm = (props: IExerciseEditForm) => {
  const { exercise } = props;
  const [exData, setExData] = useState<IExercise>(exercise);

  const [formValues, setFormValues] = useState({
    title: '',
    taskDescription: '',
  });
  const token = LSHandler.getJwt();
  const [updateExercise, { isError, isSuccess, data }] =
    useUpdateExerciseMutation({ fixedCacheKey: `exupdate` });
  const dispatch = useDispatch();
  const debounceTitle = useDebounce(formValues.title, 1500);
  const debounceDescription = useDebounce(formValues.taskDescription, 1500);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (data) {
      setExData(data);
      dispatch(replaceExercise(data));
    }
  }, [data]);

  useEffect(() => {
    if (debounceTitle.length > 0) {
      updateExercise({ token, id: exercise._id, body: formValues });
    }
  }, [debounceTitle]);

  useEffect(() => {
    if (debounceDescription.length > 0) {
      updateExercise({ token, id: exercise._id, body: formValues });
    }
  }, [debounceDescription]);

  useEffect(() => {
    dispatch(setIsEditing(false));
  }, [isSuccess, isError]);

  return (
    <Card>
      <CardHeader p={'20px 20px 0'} position={'relative'}>
        <HStack position={'absolute'} top={'20px'} right={'20px'} gap={0}>
          <BadgeUpdating />
        </HStack>
        <Editable
          key={`${exData._id}_title`}
          defaultValue={exercise.title ? exercise.title : 'Enter the task title'}
          placeholder="Enter the task title"
          fontWeight={'bold'}
          fontSize={'x-large'}
          color={'primary'}
        >
          <EditablePreview />
          <EditableInput
            _focusVisible={{ style: { boxShadow: 'none' } }}
            name="title"
            onChange={handleInputChange}
          />
        </Editable>
        <Editable
          defaultValue={
            exercise.taskDescription
              ? exercise.taskDescription
              : 'Enter the task description'
          }
          fontSize={'16px'}
          placeholder="Enter the task description"
          fontWeight={'bold'}
          color={'primary'}
          key={`${exData._id}_description`}
        >
          <EditablePreview />
          <EditableInput
            _focusVisible={{ style: { boxShadow: 'none' } }}
            name="taskDescription"
            onChange={handleInputChange}
          />
        </Editable>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'}>
        {exercise.sentenceList.map((item, index) => {
          return (
            <SentenceEditForm
              sentence={item}
              key={`${item._id}editform-${index}`}
            />
          );
        })}
      </CardBody>
      <CardFooter
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup>
          {/* <Button
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
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

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
  VStack,
  Divider,
  useDisclosure,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { IExercise } from '../interfaces/exercise';
import { IoIosCheckmark, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { SentenceEditForm } from './SentenceEditForm';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateExerciseMutation } from '../store/main-api/mutations/updateExercise';
import { useDebounce } from '../utils/useDebounce';
import { LSHandler } from '../utils/handleLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { replaceExercise } from '../store/exerciseList/exercise-list-router';
import { CheckIcon } from '@chakra-ui/icons';
import { BadgeUpdating } from './BadgeUpdating';
import { setIsEditing } from '../store/isEditing/isEditing-router';
import { FaPlus, FaRegShareFromSquare, FaRegTrashCan } from 'react-icons/fa6';
import { ShareExercisePopUp } from './ShareExercisePopUp';
import { DeleteExercisePopUp } from './DeleteExercisePopUp';
import formatDate from '@/utils/formatDate';
import { RootState } from '@/store/store';
import { AddTopicMenu } from './AddTopicMenu';
import { useRemoveTopicFromExerciseMutation } from '@/store/main-api/mutations/removeTopicFromExercise';

interface IExerciseEditForm {
  exercise: IExercise;
}

export const ExerciseEditForm = (props: IExerciseEditForm) => {
  const { exercise } = props;
  const [exData, setExData] = useState<IExercise>(exercise);

  const [formValues, setFormValues] = useState({
    title: '',
    taskDescription: '',
    isRandomOrderEnabled: exercise.isRandomOrderEnabled,
  });
  const token = LSHandler.getJwt();
  const deleteHandler = useDisclosure();
  const shareHandler = useDisclosure();

  const [updateExercise, { isError, isSuccess, data }] =
    useUpdateExerciseMutation({ fixedCacheKey: `exupdate` });
  const [removeTopic, { data: exWithRemovedTopic }] =
    useRemoveTopicFromExerciseMutation();

  const dispatch = useDispatch();
  const isEditing = useSelector((state: RootState) => state.isEditing);
  const debounceTitle = useDebounce(formValues.title, 1500);
  const debounceDescription = useDebounce(formValues.taskDescription, 1500);
  const deboundeRandomOrder = useDebounce(
    formValues.isRandomOrderEnabled,
    1500
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  function handleCheckBoxChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.checked });
  }

  useEffect(() => {
    if (data) {
      setExData(data);
      dispatch(replaceExercise(data));
    }
  }, [data]);

  useEffect(() => {
    if (exWithRemovedTopic) {
      setExData(exWithRemovedTopic);
      dispatch(replaceExercise(exWithRemovedTopic));
    }
  }, [exWithRemovedTopic]);

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
    if (isEditing) {
      updateExercise({ token, id: exercise._id, body: formValues });
    }
  }, [deboundeRandomOrder]);

  useEffect(() => {
    dispatch(setIsEditing(false));
  }, [isSuccess, isError]);

  return (
    <Card>
      <CardHeader
        p={'20px 20px 0'}
        position={'relative'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup spacing={'0.1rem'}>
          <Tooltip
            hasArrow
            label="Available in future release!"
            placement="top"
          >
            <IconButton
              size={'sm'}
              aria-label="Search database"
              icon={<FaPlus />}
              isRound
              variant={'ghost'}
              colorScheme="secondary"
              isDisabled
            />
          </Tooltip>
          <IconButton
            size={'sm'}
            aria-label="Search database"
            icon={<FaRegShareFromSquare />}
            isRound
            variant={'ghost'}
            colorScheme={'secondary'}
            onClick={() => shareHandler.onOpen()}
          />{' '}
          <IconButton
            size={'sm'}
            aria-label="Search database"
            icon={<FaRegTrashCan />}
            isRound
            variant={'ghost'}
            colorScheme="error"
            color={'error.base'}
            onClick={() => deleteHandler.onOpen()}
          />
        </ButtonGroup>
        <VStack gap={0} alignItems={'flex-end'}>
          <HStack alignItems={'flex-end'} gap={0}>
            <BadgeUpdating />
          </HStack>
          <Text fontSize={'8px'} color={'secondary.200'}>
            Updated: {formatDate(exercise.updatedAt)}
          </Text>
          <Text fontSize={'8px'} color={'secondary.200'}>
            Created: {formatDate(exercise.createdAt)}
          </Text>
        </VStack>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'} p={'0 20px 0'}>
        <Divider m={'8px 0'} />
        <Editable
          key={`${exData._id}_title`}
          defaultValue={
            exercise.title ? exercise.title : 'Enter the task title'
          }
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
        <Box display={'flex'} flexDirection={'column'} pt={'20px'}>
          {exercise.sentenceList.map((item, index) => {
            return (
              <SentenceEditForm
                sentence={item}
                key={`${item._id}editform-${index}`}
              />
            );
          })}
        </Box>
      </CardBody>
      <CardFooter
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
      >
        <Divider m={'0 0 8px'} />
        <Text fontSize={'16px'} fontWeight={'bold'} color={'primary'}>
          Exercise information:
        </Text>
        <Text>
          Skill:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exData.skill}
          </Text>
        </Text>
        <Text>
          Level:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exData.studentLevel}
          </Text>
        </Text>
        <Text>
          Learner's age:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exercise.studentAge}
          </Text>
        </Text>
        <HStack>
          <Text>Topics: </Text>
          {exercise.topicList.map((topic) => {
            return (
              <Tag colorScheme="secondary" variant={'outline'} key={topic._id}>
                <TagLabel>{topic.name}</TagLabel>
                <TagCloseButton
                  onClick={() =>
                    removeTopic({
                      token,
                      exerciseId: exercise._id,
                      topicId: topic._id,
                    })
                  }
                />
              </Tag>
            );
          })}
          <AddTopicMenu exercise={exercise} />
        </HStack>
        <Divider m={'20px 0 8px'} />
        <Text fontSize={'16px'} fontWeight={'bold'}>
          Exercise settings:
        </Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Enable random sentence order?</FormLabel>
          <Switch
            name="isRandomOrderEnabled"
            colorScheme="secondary"
            size={'sm'}
            defaultChecked={exercise.isRandomOrderEnabled}
            onChange={handleCheckBoxChange}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <Tooltip
            hasArrow
            label="Available in future release!"
            placement="top"
          >
            <FormLabel mb="0">Make exercise private?</FormLabel>
          </Tooltip>
          <Switch
            name="isPrivate"
            colorScheme="secondary"
            size={'sm'}
            isDisabled
          />
        </FormControl>

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
      <ShareExercisePopUp
        isOpen={shareHandler.isOpen}
        onClose={shareHandler.onClose}
        onOpen={shareHandler.onOpen}
        id={exData._id}
      />
      <DeleteExercisePopUp
        isOpen={deleteHandler.isOpen}
        onClose={deleteHandler.onClose}
        onOpen={deleteHandler.onOpen}
        id={exData._id}
      />
    </Card>
  );
};

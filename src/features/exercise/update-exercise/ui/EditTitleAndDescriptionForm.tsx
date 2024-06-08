import { IExercise, replaceExercise } from '@/entities/exercise';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import {
  Editable,
  EditablePreview,
  EditableInput,
  Grid,
  Text,
  HStack,
  Icon,
  Input,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateExerciseMutation } from '../api/updateExercise';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/shared/hooks/hooks';
import { useDebounce } from '@/shared/utils/useDebounce';
import { setIsEditing } from '@/shared';
import { AiFillEdit } from 'react-icons/ai';
import { TextInput } from '@/shared/ui/text-input/TextInput';
import { TextInputWithUpdateField } from '@/shared/ui/text-input/TextInputUpdatable';

interface IEditTitleAndDescriptionForm {
  exercise: IExercise;
}

export const EditTitleAndDescriptionForm = (
  props: IEditTitleAndDescriptionForm
): JSX.Element => {
  const { exercise } = props;
  const [formValues, setFormValues] = useState({
    title: exercise.title || '',
    taskDescription: exercise.taskDescription || '',
    isRandomOrderEnabled: exercise.isRandomOrderEnabled,
  });

  const token = LSHandler.getJwt();
  const [updateExercise, { isError, isSuccess, data }] =
    useUpdateExerciseMutation({ fixedCacheKey: `exupdate` });

  const [isSuccessTitleUpdate, setIsSuccessTitleUpdate] = useState(false);
  const [isSuccessTaskDescriptionUpdate, setIsSuccessTaskDescriptionUpdate] =
    useState(false);

  const dispatch = useDispatch();
  const debounceTitle = useDebounce(formValues.title, 1500);
  const debounceDescription = useDebounce(formValues.taskDescription, 1500);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (data) {
      dispatch(replaceExercise(data));
    }
  }, [data]);

  useEffect(() => {
    if (debounceTitle.length > 0 && debounceTitle !== exercise.title) {
      updateExercise({
        token,
        id: exercise._id,
        body: { title: formValues.title },
      })
        .then(() => setIsSuccessTitleUpdate(true))
        .catch(() => setIsSuccessTitleUpdate(false));
    }
  }, [debounceTitle]);

  useEffect(() => {
    if (
      debounceDescription.length > 0 &&
      debounceDescription !== exercise.taskDescription
    ) {
      updateExercise({
        token,
        id: exercise._id,
        body: { taskDescription: formValues.taskDescription },
      })
        .then(() => {
          setIsSuccessTaskDescriptionUpdate(true);
        })
        .catch(() => setIsSuccessTaskDescriptionUpdate(false));
    }
  }, [debounceDescription]);

  useEffect(() => {
    dispatch(setIsEditing(false));
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccessTitleUpdate(false);
        setIsSuccessTaskDescriptionUpdate(false);
      }, 2000);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <TextInputWithUpdateField
        title="Title"
        inputProps={{
          defaultValue: exercise.title,
          name: 'title',
          variant: 'secondary',
          color: 'primary.base',
          placeholder: 'Enter the task title',
          onChange: handleInputChange,
          onBlur: () => dispatch(setIsEditing(false)),
          isSuccess: isSuccessTitleUpdate,
          isInvalid: isError,
        }}
      />
      <TextInputWithUpdateField
        title="Description"
        inputProps={{
          defaultValue: exercise.taskDescription,
          name: 'taskDescription',
          variant: 'secondary',
          color: 'primary.base',
          placeholder: 'Enter the task description',
          onChange: handleInputChange,
          onBlur: () => dispatch(setIsEditing(false)),
          isSuccess: isSuccessTaskDescriptionUpdate,
          isInvalid: isError,
        }}
      />
    </>
  );
};

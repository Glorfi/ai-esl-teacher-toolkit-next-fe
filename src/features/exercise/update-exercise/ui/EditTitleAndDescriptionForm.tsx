import { IExercise, replaceExercise } from '@/entities/exercise';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateExerciseMutation } from '../api/updateExercise';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/shared/hooks/hooks';
import { useDebounce } from '@/shared/utils/useDebounce';
import { setIsEditing } from '@/shared';


interface IEditTitleAndDescriptionForm {
  exercise: IExercise;
}

export const EditTitleAndDescriptionForm = (
  props: IEditTitleAndDescriptionForm
): JSX.Element => {
  const { exercise } = props;
  const [formValues, setFormValues] = useState({
    title: '',
    taskDescription: '',
    isRandomOrderEnabled: exercise.isRandomOrderEnabled,
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
    <>
      <Editable
        key={`${exercise._id}_title`}
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
        key={`${exercise._id}_description`}
      >
        <EditablePreview />
        <EditableInput
          _focusVisible={{ style: { boxShadow: 'none' } }}
          name="taskDescription"
          onChange={handleInputChange}
        />
      </Editable>
    </>
  );
};

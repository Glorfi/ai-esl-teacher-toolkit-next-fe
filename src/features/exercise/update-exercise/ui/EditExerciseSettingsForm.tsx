import { IExercise } from '@/entities/exercise';
import { setIsEditing } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useDebounce } from '@/shared/utils/useDebounce';
import { FormControl, FormLabel, Switch, Tooltip } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateExerciseMutation } from '../api/updateExercise';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';

interface IEditExerciseSettingsForm {
  exercise: IExercise;
}

export const EditExerciseSettingsForm = (
  props: IEditExerciseSettingsForm
): JSX.Element => {
  const { exercise } = props;
  const [formValues, setFormValues] = useState({
    title: '',
    taskDescription: '',
    isRandomOrderEnabled: exercise.isRandomOrderEnabled,
  });
  const deboundeRandomOrder = useDebounce(
    formValues.isRandomOrderEnabled,
    1500
  );

  const [updateExercise, { isError, isSuccess, data }] =
    useUpdateExerciseMutation({ fixedCacheKey: `exupdate` });

  const token = LSHandler.getJwt();
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.isEditing);

  function handleCheckBoxChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.checked });
  }

  useEffect(() => {
    if (isEditing) {
      updateExercise({ token, id: exercise._id, body: formValues });
    }
  }, [deboundeRandomOrder]);

  return (
    <>
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
        <Tooltip hasArrow label="Available in future release!" placement="top">
          <FormLabel mb="0">Make exercise private?</FormLabel>
        </Tooltip>
        <Switch
          name="isPrivate"
          colorScheme="secondary"
          size={'sm'}
          isDisabled
        />
      </FormControl>
    </>
  );
};

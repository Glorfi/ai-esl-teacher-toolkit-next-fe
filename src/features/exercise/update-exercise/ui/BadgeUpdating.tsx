import { Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { useEffect, useState } from 'react';

import { customError } from '../../../../shared/constants/customError';
import { useUpdateExerciseMutation } from '@/features/exercise';
import { useUpdateSentenceMutation } from '@/features/sentence';
import { useAppSelector } from '@/shared/hooks/hooks';
import { CheckboxIcon } from '@/shared/ui/icons/CheckBox';
import formatDate from '@/shared/utils/formatDate';
import { IExercise } from '@/entities/exercise';
import { UpdatingCircleIcon } from '@/shared/ui/icons/UpdatingCircle';
import { CloseIcon } from '@chakra-ui/icons';

interface IBadgeUpdating {
  exercise: IExercise;
}

export const BadgeUpdating = (props: IBadgeUpdating): JSX.Element => {
  const { exercise } = props;
  const [, exerciseResult] = useUpdateExerciseMutation({
    fixedCacheKey: 'exupdate',
  });
  const [, sentenceResult] = useUpdateSentenceMutation({
    fixedCacheKey: 'sentenceupd',
  });
  const isUpdating = useAppSelector((state) => state.isEditing);
  const [message, setMessage] = useState<string>('Updated');
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    if (isUpdating) {
      setMessage('Updating...');
    } else {
      setMessage('Updated');
    }
  }, [isUpdating]);

  useEffect(() => {
    if (exerciseResult.isError || sentenceResult.isError) {
    }
  }, [exerciseResult, sentenceResult]);

  useEffect(() => {
    if (exerciseResult.error) {
      const customExError = exerciseResult.error as customError;
      setErrorMessage(customExError.data.message);
    }
    if (sentenceResult.error) {
      const customExError = sentenceResult.error as customError;
      setErrorMessage(customExError.data.message);
    }
  }, [exerciseResult.isError, sentenceResult.isError]);

  useEffect(() => {
    if (exerciseResult.isSuccess || sentenceResult.isSuccess || isUpdating) {
      setErrorMessage(null);
    }
  }, [exerciseResult.isSuccess, sentenceResult.isSuccess, isUpdating]);

  return (
    <>
      <Stack
        w={'100%'}
        flexDirection={'row'}
        gap={'2px'}
        justifyContent={'flex-end'}
      >
        {!errorMessage && (
          <Icon
            as={isUpdating && !errorMessage ? UpdatingCircleIcon : CheckboxIcon}
            boxSize={'12px'}
            color={'primary.base'}
          />
        )}
        {errorMessage && !isUpdating ? (
          <Icon as={CloseIcon} boxSize={'12px'} color={'error.base'} />
        ) : null}
        <Text
          color={!errorMessage ? 'primary.base' : 'error.base'}
          fontSize={'10px'}
          fontWeight={'semibold'}
        >
          {!errorMessage || isUpdating ? message : errorMessage}
        </Text>
        {!isUpdating && !errorMessage ? (
          <Text fontSize={'10px'}>{formatDate(exercise.updatedAt)}</Text>
        ) : null}
      </Stack>
      <Stack
        w={'100%'}
        flexDirection={'row'}
        gap={'2px'}
        justifyContent={'flex-end'}
      >
        <Text color={'graySecondary'} fontSize={'10px'} fontWeight={'semibold'}>
          Created:
        </Text>
        <Text fontSize={'10px'} color={'graySecondary'}>
          {formatDate(exercise.createdAt)}
        </Text>
      </Stack>
    </>
  );
};

import { Icon, Text } from '@chakra-ui/react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { useEffect, useState } from 'react';

import { customError } from '../../../../shared/constants/customError';
import { useUpdateExerciseMutation } from '@/features/exercise';
import { useUpdateSentenceMutation } from '@/features/sentence';
import { useAppSelector } from '@/shared/hooks/hooks';

export const BadgeUpdating = (): JSX.Element => {
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
    if (exerciseResult.isSuccess || sentenceResult.isSuccess) {
      setErrorMessage(null);
    }
  }, [exerciseResult.isSuccess, sentenceResult.isSuccess]);

  return (
    <>
      <Text
        color={!errorMessage ? 'secondary.200' : 'error.base'}
        fontSize={'8px'}
      >
        {!errorMessage ? message : errorMessage}
      </Text>
      {!isUpdating && !errorMessage ? (
        <Icon
          as={IoMdCheckmarkCircleOutline}
          ml={'4px'}
          boxSize={'12px'}
          color={'secondary.200'}
        />
      ) : null}
    </>
  );
};

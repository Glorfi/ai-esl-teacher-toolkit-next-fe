import {
  Grid,
  GridProps,
  HStack,
  Icon,
  InputProps,
  Text,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { TextInput, TextInputProps } from './TextInput';
import { ChangeEvent, useEffect, useState } from 'react';
import { UpdatingCircleIcon } from '../icons/UpdatingCircle';
import { CheckboxIcon } from '../icons/CheckBox';
import { CloseIcon } from '@chakra-ui/icons';
import { IoClose } from 'react-icons/io5';

interface TextInputWithUpdateFieldProps extends GridProps {
  inputProps?: TextInputProps;
  fakeFocus?: boolean;
  isInvalid?: boolean;
  title: string;
}

export const TextInputWithUpdateField = ({
  inputProps,
  title,
  fakeFocus,
  isInvalid,
  ...gridProps
}: TextInputWithUpdateFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (inputProps && inputProps.onChange) {
      inputProps.onChange(e);
      setIsEditing(true);
    }
    setIsEditing(true);
  }

  useEffect(() => {
    setIsEditing(false);
  }, [inputProps?.isSuccess, inputProps?.isInvalid]);
  return (
    <Grid templateColumns={'1fr 1fr'} w={'100%'} {...gridProps}>
      <Text color={'graySecondary'} fontSize={'xs'}>
        {title}
      </Text>
      <HStack justifySelf={'end'} gap="2px">
        {!inputProps?.isSuccess ? (
          <Icon
            as={
              (isFocused && !inputProps?.isInvalid) ||
              (fakeFocus && !inputProps?.isInvalid)
                ? UpdatingCircleIcon
                : inputProps?.isInvalid
                ? CloseIcon
                : AiFillEdit
            }
            color={
              (isFocused && !inputProps?.isInvalid) ||
              (fakeFocus && !inputProps?.isInvalid)
                ? 'secondary.base'
                : inputProps?.isInvalid
                ? 'error.base'
                : 'graySecondary'
            }
            boxSize={'10px'}
          />
        ) : (
          <Icon
            as={CheckboxIcon}
            color={'greenOpacity.base'}
            boxSize={'10px'}
          />
        )}
        <Text
          color={
            (isEditing || fakeFocus || isFocused) &&
            !inputProps?.isSuccess &&
            !inputProps?.isInvalid
              ? 'secondary.base'
              : inputProps?.isSuccess
              ? 'greenOpacity.base'
              : inputProps?.isInvalid
              ? 'error.base'
              : 'graySecondary'
          }
          fontSize={'xs'}
        >
          {!inputProps?.isSuccess &&
          !inputProps?.isInvalid &&
          (isEditing || fakeFocus)
            ? 'Editing'
            : inputProps?.isSuccess
            ? 'Saved'
            : inputProps?.isInvalid
            ? 'Error'
            : 'Edit'}
        </Text>
      </HStack>
      <TextInput
        mt={'4px'}
        gridColumn={'1/3'}
        {...inputProps}
        isInvalid={isInvalid || inputProps?.isInvalid}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          inputProps?.onBlur ? inputProps?.onBlur(e) : null;
          setIsFocused(false);
          setIsEditing(false);
        }}
        onChange={handleInputChange}
      />
    </Grid>
  );
};

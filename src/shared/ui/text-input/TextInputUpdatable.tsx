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

interface TextInputWithUpdateFieldProps extends GridProps {
  inputProps?: TextInputProps;
  title: string;
}

export const TextInputWithUpdateField = ({
  inputProps,
  title,
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
  }, [inputProps?.isSuccess]);
  return (
    <Grid templateColumns={'1fr 1fr'} w={'100%'} {...gridProps}>
      <Text color={'graySecondary'} fontSize={'xs'}>
        {title}
      </Text>
      <HStack justifySelf={'end'} gap="2px">
        {!inputProps?.isSuccess ? (
          <Icon
            as={
              isEditing && !inputProps?.isInvalid
                ? UpdatingCircleIcon
                : AiFillEdit
            }
            color={isFocused ? 'secondary.base' : 'graySecondary'}
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
            isFocused && !inputProps?.isSuccess
              ? 'secondary.base'
              : inputProps?.isSuccess
              ? 'greenOpacity.base'
              : 'graySecondary'
          }
          fontSize={'xs'}
        >
          {isEditing ? 'Editing' : inputProps?.isSuccess ? 'Saved' : 'Edit'}
        </Text>
      </HStack>
      <TextInput
        mt={'4px'}
        gridColumn={'1/3'}
        {...inputProps}
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

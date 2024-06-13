import {
  VStack,
  Input,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  ButtonGroup,
  SlideFade,
  Box,
  Button,
  Stack,
} from '@chakra-ui/react';

import { GrEdit } from 'react-icons/gr';
import { ISentenceBodyUpdateRequest } from '../model/types';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import validator from 'validator';

import {
  replaceSentence,
  updateTimeStampById,
} from '@/entities/exercise/model/exercise-list-router';
import { setIsEditing } from '@/shared';
import { ISentence } from '@/entities/sentence';
import { useUpdateSentenceMutation } from '../api/updateSentence';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useDebounce } from '@/shared/utils/useDebounce';
import { useAppSelector } from '@/shared/hooks/hooks';
import { TextInputWithUpdateField } from '@/shared/ui/text-input/TextInputUpdatable';
import { CloseIcon } from '@chakra-ui/icons';

interface ISentenceEditFormProps {
  sentence: ISentence;
  orderNumber: number;
}

export const SentenceEditForm = (
  props: ISentenceEditFormProps
): JSX.Element => {
  const { sentence, orderNumber } = props;
  const token = LSHandler.getJwt();
  const isEditButtonVisible = useDisclosure();
  const isFormOpen = useDisclosure();
  const exerciseType = useAppSelector(
    (state) =>
      state.exerciseList.find((exercise) => exercise._id === sentence.exercise)
        ?.type
  );

  const [rendered, setRendered] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ISentenceBodyUpdateRequest>({
    sentence: sentence.sentence,
    hint: sentence.hint,
    answer: sentence.answer,
    options: sentence.options,
    exerciseType: exerciseType ? exerciseType : 'fillInGaps',
  });
  const [isSentenceValid, setIsSentenceValid] = useState<boolean>(true);
  const [isAnswerValid, setIsAnswerValid] = useState<boolean>(true);
  const [areOptionsValid, setAreOptionsValid] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [updateSentence, { data, isSuccess: isSaved, isError }] =
    useUpdateSentenceMutation({
      fixedCacheKey: 'sentenceupd',
    });
  const dispatch = useDispatch();

  const debounceForm = useDebounce(formValues, 1500);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleOptionsChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsEditing(true));
    if (formValues.options) {
      const index = Number(e.target.name);
      const updatedOptions = [...formValues.options];
      updatedOptions[index] = e.target.value;
      setFormValues({ ...formValues, options: updatedOptions });
    }
  }

  useEffect(() => {
    if (rendered) {
      updateSentence({ token, id: sentence._id, body: formValues })
        .then(() => setIsSuccess(true))
        .catch(() => setIsSuccess(false));
    } else {
      setRendered(true);
    }
  }, [debounceForm]);

  useEffect(() => {
    if (data && data.exercise) {
      dispatch(replaceSentence(data));
      dispatch(updateTimeStampById(data.exercise));
    }
  }, [data]);

  useEffect(() => {
    if (formValues.sentence && formValues.answer) {
      setIsSentenceValid(
        validator.contains(formValues.sentence, formValues.answer)
      );
      console.log(`Sentence validity: ${isSentenceValid}`);
    }
  }, [formValues.sentence, formValues.answer, isError]);

  useEffect(() => {
    if (formValues.answer && formValues.sentence) {
      //  console.log("here");

      setIsAnswerValid(formValues.sentence?.includes(formValues.answer));
    }
    // if (
    //   exerciseType === 'multipleChoice' &&
    //   formValues.answer &&
    //   formValues.options
    // ) {
    //   setIsAnswerValid(formValues.options.includes(formValues.answer));
    // }
  }, [formValues.answer, formValues.sentence, isError]);

  useEffect(() => {
    if (
      formValues.answer &&
      formValues.options &&
      exerciseType === 'multipleChoice'
    ) {
      setAreOptionsValid(formValues.options.includes(formValues.answer));
      setIsSentenceValid(formValues.options.includes(formValues.answer));
    }
    if (
      formValues.answer &&
      formValues.options &&
      exerciseType === 'fillInGaps'
    ) {
      setAreOptionsValid(true);
    }
  }, [formValues.answer, formValues.options, isError]);

  useEffect(() => {
    dispatch(setIsEditing(false));
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  }, [isError, isSaved]);

  return (
    <VStack gap={0} w={'100%'}>
      <TextInputWithUpdateField
        title={`Sentence ${orderNumber + 1}`}
        fakeFocus={isFormOpen.isOpen && !isSuccess}
        inputProps={{
          defaultValue: sentence.sentence,
          name: 'sentence',
          variant: isFormOpen.isOpen ? 'secondaryForced' : 'secondary',
          color: 'primary.base',
          onChange: handleInputChange,
          isInvalid: !isSentenceValid,
          isSuccess: isSuccess && data && data._id === sentence._id,
          errorMessage: !isAnswerValid
            ? 'The sentence must include the answer'
            : !areOptionsValid
            ? 'The options must include the answer'
            : 'Something went wrong',
        }}
        onClick={() => isFormOpen.onOpen()}
      />
      <Box w={'100%'}>
        <SlideFade in={isFormOpen.isOpen}>
          <VStack
            alignItems={'flex-start'}
            w={'100%'}
            display={isFormOpen.isOpen ? 'flex' : 'none'}
            gap={0}
          >
            <HStack w={'100%'} flexDirection={['column', 'row']}>
              <TextInputWithUpdateField
                title="Hint"
                fakeFocus={isFormOpen.isOpen && !isSuccess}
                inputProps={{
                  defaultValue: sentence.hint,
                  name: 'hint',
                  variant: 'secondaryForced',
                  color: 'primary.base',
                  onChange: handleInputChange,
                  // onBlur: () => dispatch(setIsEditing(false)),
                  // isSuccess: isSuccessTitleUpdate,
                  isSuccess: isSuccess && data && data._id === sentence._id,
                  errorMessage: 'Something went wrong',
                }}
              />
              <TextInputWithUpdateField
                title="Answer"
                fakeFocus={isFormOpen.isOpen && !isSuccess}
                inputProps={{
                  defaultValue: sentence.answer,
                  name: 'answer',
                  variant: 'secondaryForced',
                  color: 'primary.base',
                  onChange: handleInputChange,
                  isSuccess: isSuccess && data && data._id === sentence._id,
                  isInvalid: !isAnswerValid,
                  errorMessage: 'The sentence must include the answer',
                  textProps: { gridColumn: '1/3' },
                }}
              />
            </HStack>
            {exerciseType === 'multipleChoice' && sentence.options ? (
              <Stack
                w={'100%'}
                justifyContent={'center'}
                alignItems={['flex-start', 'center']}
                flexDirection={['column', 'row']}
              >
                {sentence.options.map((option, index) => (
                  <TextInputWithUpdateField
                    title="Option"
                    fakeFocus={isFormOpen.isOpen && !isSuccess}
                    inputProps={{
                      type: 'text',
                      name: index.toString(),
                      placeholder: 'option',
                      defaultValue: option,
                      onChange: handleOptionsChange,
                      isInvalid: !areOptionsValid,
                      variant: 'secondaryForced',
                      color: 'primary.base',
                      isSuccess: isSuccess && data && data._id === sentence._id,
                      errorMessage: 'The options must include the answer',
                      textProps: { gridColumn: '1/3' },
                    }}
                    key={`${option}option${index}`}
                    // width={'fit-content'}
                  />
                ))}
              </Stack>
            ) : null}
            <Button
              mt={'12px'}
              mb={'12px'}
              ml={'auto'}
              leftIcon={<CloseIcon />}
              variant={'outline'}
              colorScheme="secondary"
              size={'sm'}
              onClick={isFormOpen.onClose}
            >
              Close
            </Button>
          </VStack>
        </SlideFade>
      </Box>
      {/* <HStack
        onMouseEnter={isEditButtonVisible.onOpen}
        onMouseLeave={isEditButtonVisible.onClose}
        minH={'32px'}
      >
        <IconButton
          display={'flex'}
          aria-label=""
          icon={<GrEdit />}
          size={'xs'}
          visibility={isEditButtonVisible.isOpen ? 'visible' : 'hidden'}
          variant={'unstyled'}
          onClick={isFormOpen.onToggle}
        />
        <Text
          fontWeight={isFormOpen.isOpen ? 'bold' : 400}
          color={
            isSentenceValid && areOptionsValid && isAnswerValid
              ? 'primary.base'
              : 'error.base'
          }
          onClick={isFormOpen.onToggle}
          cursor={'pointer'}
        >
          {sentence.sentence}
        </Text>
      </HStack>
      <SlideFade in={isFormOpen.isOpen}>
        <VStack
          display={isFormOpen.isOpen ? 'flex' : 'none'}
          alignItems={'flex-start'}
          marginLeft={'calc(24px + 0.5rem)'}
          padding={'8px'}
          border={'2px solid'}
          borderColor={'highlight.base'}
          borderRadius={'8px'}
        >
          <Box w={'100%'}>
            <Text>Sentence</Text>
            <Input
              type="text"
              name="sentence"
              placeholder="sentence"
              colorScheme="secondary"
              defaultValue={sentence.sentence}
              size={'sm'}
              borderRadius={'40px'}
              onChange={handleInputChange}
              isInvalid={!isSentenceValid}
            />
          </Box>
          <VStack alignItems={'flex-start'} w={'100%'}>
            <HStack
              flexDirection={['column', 'row']}
              alignItems={['flex-start', 'center']}
              w={'100%'}
            >
              <Text>Hint</Text>
              <Input
                type="text"
                placeholder="hint"
                name="hint"
                defaultValue={sentence.hint}
                size={'sm'}
                w={['100%', 'min-content']}
                borderRadius={'40px'}
                onChange={handleInputChange}
              />
              <Text>Answer</Text>
              <Input
                type="text"
                placeholder="answer"
                name="answer"
                defaultValue={sentence.answer}
                size={'sm'}
                w={['100%', 'min-content']}
                borderRadius={'40px'}
                onChange={handleInputChange}
                isInvalid={!isAnswerValid}
              />
            </HStack>
            {exerciseType === 'multipleChoice' ? (
              <ButtonGroup
                justifyContent={'center'}
                alignItems={['flex-start', 'center']}
                flexDirection={['column', 'row']}
                gap={['0.5rem', 'unset']}
                w={'100%'}
              >
                <Text>Options</Text>
                {sentence.options?.map((option, index) => {
                  return (
                    <Input
                      type="text"
                      size={'sm'}
                      name={index.toString()}
                      borderRadius={'40px'}
                      placeholder="option"
                      defaultValue={option}
                      key={`${option}option${index}`}
                      onChange={handleOptionsChange}
                      isInvalid={!areOptionsValid}
                      w={['100%', 'min-content']}
                    />
                  );
                })}
              </ButtonGroup>
            ) : null}
          </VStack>
        </VStack>
      </SlideFade>*/}
    </VStack>
  );
};

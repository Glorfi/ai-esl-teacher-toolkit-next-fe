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
} from '@chakra-ui/react';
import { ISentence } from '../interfaces/sentence-with-input';
import { GrEdit } from 'react-icons/gr';
import { ISentenceBodyUpdateRequest } from '../interfaces/requests/updateSentence';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { useUpdateSentenceMutation } from '../store/main-api/mutations/updateSentence';
import { LSHandler } from '../utils/handleLocalStorage';
import { useDispatch } from 'react-redux';
import {
  replaceSentence,
  updateTimeStampById,
} from '../store/exerciseList/exercise-list-router';
import validator from 'validator';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setIsEditing } from '../store/isEditing/isEditing-router';

interface ISentenceEditFormProps {
  sentence: ISentence;
}

export const SentenceEditForm = (
  props: ISentenceEditFormProps
): JSX.Element => {
  const { sentence } = props;
  const token = LSHandler.getJwt();
  const isEditButtonVisible = useDisclosure();
  const isFormOpen = useDisclosure();

  const [rendered, setRendered] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ISentenceBodyUpdateRequest>({
    sentence: sentence.sentence,
    hint: sentence.hint,
    answer: sentence.answer,
    options: sentence.options,
  });
  const [isSentenceValid, setIsSentenceValid] = useState<boolean>(true);
  const [isAnswerValid, setIsAnswerValid] = useState<boolean>(true);
  const [areOptionsValid, setAreOptionsValid] = useState<boolean>(true);
  const exerciseType = useSelector(
    (state: RootState) =>
      state.exerciseList.find((exercise) => exercise._id === sentence.exercise)
        ?.type
  );

  const [updateSentence, { data, isSuccess, isError }] =
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
      updateSentence({ token, id: sentence._id, body: formValues });
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
    }
  }, [formValues.sentence, formValues.answer]);

  useEffect(() => {
    if (formValues.answer && formValues.sentence) {
      setIsAnswerValid(formValues.sentence?.includes(formValues.answer));
    }
  }, [formValues.answer, formValues.sentence]);

  useEffect(() => {
    if (formValues.answer && formValues.options) {
      setAreOptionsValid(formValues.options.includes(formValues.answer));
    }
  }, [formValues.answer, formValues.options]);

  useEffect(() => {
    dispatch(setIsEditing(false));
  }, [isError, isSuccess]);

  return (
    <>
      <HStack
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
        <Text fontWeight={isFormOpen.isOpen ? 'bold' : 400}>
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
      </SlideFade>
    </>
  );
};

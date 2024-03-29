import { IExercise } from '@/interfaces/exercise';
import { ITopic } from '@/interfaces/topic';
import { useLazyGetTopicsAutocompleteQuery } from '@/store/main-api/queries/getTopicsAutocomplete';
import { LSHandler } from '@/utils/handleLocalStorage';
import { useDebounce } from '@/utils/useDebounce';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Input,
  Text,
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
  useDisclosure,
  Button,
  flexbox,
  background,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { CreateTopicPopUp } from './CreateTopicPopUp';
import { useAddTopicToExerciseMutation } from '@/store/main-api/mutations/addTopicToExercise';
import { useDispatch } from 'react-redux';
import { replaceExercise } from '@/store/exerciseList/exercise-list-router';

interface IAddTopicMenuProps {
  exercise: IExercise;
}
interface ITopicMenuFormValues {
  name?: string | undefined;
}
export const AddTopicMenu = (props: IAddTopicMenuProps): JSX.Element => {
  const { exercise } = props;
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<ITopicMenuFormValues | null>(
    null
  );
  const [topicOptions, setTopicOptions] = useState<ITopic[] | null>(null);
  const debounceTopicName = useDebounce(formValues?.name, 1500);

  const topicPopUp = useDisclosure();

  const token = LSHandler.getJwt();
  const [
    getTopicList,
    { data: fetchedTopicList, isSuccess: isTopicListSuccess },
  ] = useLazyGetTopicsAutocompleteQuery();
  const [addTopic, { data: updatedEx, isLoading }] =
    useAddTopicToExerciseMutation();

  const dispatch = useDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleCloseMenu() {
    setTopicOptions(null);
    setFormValues(null);
  }

  useEffect(() => {
    if (initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else {
      setTopicOptions(null);
    }
  }, [inputFocused]);

  useEffect(() => {
    if (debounceTopicName && debounceTopicName.length > 1) {
      getTopicList({ token, name: debounceTopicName });
    } else {
      setTopicOptions(null);
    }
  }, [debounceTopicName]);

  useEffect(() => {
    if (fetchedTopicList) {
      setTopicOptions(fetchedTopicList);
      setInputFocused(true);
    }
  }, [fetchedTopicList]);

  useEffect(() => {
    if (updatedEx) {
      dispatch(replaceExercise(updatedEx));
    }
  }, [updatedEx]);

  return (
    <>
      <Menu
        placement="right-end"
        initialFocusRef={initialFocusRef}
        isLazy
        onClose={handleCloseMenu}
      >
        <MenuButton
          as={IconButton}
          aria-label="add tag"
          icon={<FaPlus />}
          size={'xs'}
          isRound
          variant={'ghost'}
          colorScheme="secondary"
        />
        <MenuList>
          <Input
            ref={initialFocusRef}
            variant={'unstyled'}
            p={'6px 12px'}
            placeholder="Add topics..."
            size={'sm'}
            color={'primary'}
            name="name"
            onChange={handleInputChange}
            onFocus={() => setInputFocused(true)} // Добавлен обработчик события фокуса
            onBlur={() => setInputFocused(false)} // Добавлен обработчик события разфокусировки
          />
          {topicOptions && topicOptions.length > 0 ? (
            <>
              <MenuDivider />
              <MenuOptionGroup type="checkbox">
                {topicOptions.map((topic) => {
                  if (
                    exercise.topicList.some((item) => item._id === topic._id)
                  ) {
                    return null;
                  }
                  return (
                    <MenuItemOption
                      key={topic._id}
                      fontSize={'0.875rem'}
                      fontWeight={'semibold'}
                      color={'secondary.base'}
                      isChecked={exercise.topicList.some(
                        (item) => item._id === topic._id
                      )}
                      value={topic._id}
                      _hover={{ backgroundColor: 'secondary.50' }}
                      onClick={() =>
                        addTopic({
                          token,
                          body: {
                            exerciseId: exercise._id,
                            topicId: topic._id,
                          },
                        })
                      }
                    >
                      {topic.name}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </>
          ) : null}
          {topicOptions && topicOptions.length > 0 ? (
            <>
              {formValues?.name?.toLowerCase() !==
                topicOptions[0].name.toLowerCase() && (
                <MenuItem
                  as={'div'}
                  closeOnSelect={false}
                  justifyContent={'flex-start'}
                  p={0}
                >
                  <Button
                    type="button"
                    variant={'ghost'}
                    colorScheme="secondary"
                    leftIcon={<FaPlus />}
                    size={'sm'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    width={'100%'}
                    onClick={() => topicPopUp.onOpen()}
                  >
                    Create new topic: "{formValues?.name}"
                  </Button>
                </MenuItem>
              )}
            </>
          ) : (
            // Отображение кнопки, если topicOptions пуст
            <>
              {topicOptions &&
                formValues &&
                formValues.name &&
                formValues?.name?.length > 0 && (
                  <MenuItem
                    as={'div'}
                    closeOnSelect={false}
                    justifyContent={'flex-start'}
                    p={0}
                  >
                    <Button
                      type="button"
                      variant={'ghost'}
                      colorScheme="secondary"
                      leftIcon={<FaPlus />}
                      size={'sm'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      width={'100%'}
                      isDisabled={formValues?.name?.length === 0}
                      onClick={() => topicPopUp.onOpen()}
                    >
                      Create new topic: "{formValues?.name}"
                    </Button>
                  </MenuItem>
                )}
            </>
          )}
        </MenuList>
      </Menu>
      <CreateTopicPopUp
        isOpen={topicPopUp.isOpen}
        exerciseId={exercise._id}
        topicName={formValues?.name}
        onClose={topicPopUp.onClose}
      />
    </>
  );
};

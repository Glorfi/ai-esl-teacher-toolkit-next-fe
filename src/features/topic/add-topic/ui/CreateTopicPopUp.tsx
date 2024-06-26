import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { replaceExercise } from '@/entities/exercise';
import { useAddTopicToExerciseMutation } from '@/features/topic/add-topic/api/addTopicToExercise';
import { IAddTopic } from '@/features/topic/add-topic/model/types';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';

interface ICreateTopicPopUpProps {
  isOpen: boolean;
  // onOpen: () => void;
  onClose: () => void;
  topicName: string | undefined;
  exerciseId: string;
}

export const CreateTopicPopUp = (
  props: ICreateTopicPopUpProps
): JSX.Element => {
  const { isOpen, onClose, topicName, exerciseId } = props;

  const token = LSHandler.getJwt();
  const [createTopic, { data, isLoading }] = useAddTopicToExerciseMutation();
  const [formValues, setFormValues] = useState<IAddTopic>({
    exerciseId,
    skill: 'vocabulary',
    name: topicName,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (topicName) {
      setFormValues({ ...formValues, name: topicName });
    }
  }, [topicName]);

  function handleConfirmClick() {
    createTopic({ token, body: formValues });
  }

  useEffect(() => {
    if (data) {
      dispatch(replaceExercise(data));
      onClose();
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
      <ModalOverlay bg={'blackAlpha.700'} backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader color={'primary.base'}>
          Add topic to the exercise?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={'grid'}
          gridTemplateColumns={'60px 1fr'}
          alignItems={'center'}
        >
          <FormLabel m={'0 8px 0 0'}>Skill</FormLabel>
          <Select
            size={'sm'}
            name="skill"
            colorScheme="secondary"
            variant={'flushed'}
            defaultValue={'vocabulary'}
            onChange={(e) =>
              setFormValues({ ...formValues, skill: e.target.value })
            }
          >
            <option value={'grammar'}>grammar</option>
            <option value={'vocabulary'}>vocabulary</option>
          </Select>
          <FormLabel m={'0 8px 0 0'}>Name</FormLabel>
          <Input
            type="text"
            defaultValue={topicName}
            size={'sm'}
            colorScheme="secondary"
            variant={'flushed'}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </ModalBody>
        <ModalFooter gap={'0.5rem'}>
          <Button variant="ghost" onClick={onClose} colorScheme="secondary">
            No
          </Button>
          <Button
            colorScheme="secondary"
            mr={3}
            // onClick={handleDeleteExercise}
            isLoading={isLoading}
            loadingText={'Adding...'}
            onClick={handleConfirmClick}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

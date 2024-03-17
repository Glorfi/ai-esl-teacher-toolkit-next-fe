import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import { LSHandler } from '../utils/handleLocalStorage';
import { useDeleteExerciseMutation } from '../store/main-api/mutations/deleteExercise';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeExercise } from '../store/exerciseList/exercise-list-router';

interface IDeleteExercisePopUpProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
}

export const DeleteExercisePopUp = (
  props: IDeleteExercisePopUpProps
): JSX.Element => {
  const { isOpen, onOpen, onClose, id } = props;

  const jwt = LSHandler.getJwt();
  const [deleteExercise, { data, isLoading }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });
  const dispatch = useDispatch();

  function handleDeleteExercise(e: React.MouseEvent) {
    deleteExercise({ token: jwt, id });
  }

  useEffect(() => {
    if (data) {
      dispatch(removeExercise(data?._id));
      onClose();
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
      <ModalOverlay bg={'blackAlpha.700'} backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader color={'primary'}>Delete exercise?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={'primary'}>
            Are you sure you want to delete the exercise?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="error"
            mr={3}
            onClick={handleDeleteExercise}
            isLoading={isLoading}
            loadingText={'Deleting...'}
          >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose} colorScheme="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

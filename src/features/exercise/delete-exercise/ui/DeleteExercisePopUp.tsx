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
  ButtonGroup,
} from '@chakra-ui/react';
import { LSHandler } from '../../../../shared/hooks/handleLocalStorage';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeExercise } from '@/entities/exercise';
import { useDeleteExerciseMutation } from '../api/deleteExercise';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';

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
        <ModalHeader color={'primary.base'}>Delete exercise?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={'primary.base'}>
            Are you sure? You can't undo this action.
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button variant="outline" onClick={onClose} colorScheme="secondary">
              Cancel
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="error"
              mr={3}
              onClick={handleDeleteExercise}
              isLoading={isLoading}
              loadingText={'Deleting...'}
            >
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

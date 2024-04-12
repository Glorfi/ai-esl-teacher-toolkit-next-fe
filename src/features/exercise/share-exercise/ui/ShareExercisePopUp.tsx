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
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

import { FaRegCopy } from 'react-icons/fa6';
import { useState } from 'react';
import { APP_PATHS } from '@/shared';

interface IShareExercisePopUpProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
}
export const ShareExercisePopUp = (
  props: IShareExercisePopUpProps
): JSX.Element => {
  const { isOpen, onOpen, onClose, id } = props;
  const publicLink = `http://${
    window.location.host
  }${APP_PATHS.SHARED_EXERCISE.replace('/:id', '/')}${id}`;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function handleCopyButton(e: React.MouseEvent) {
    console.log(navigator);

    navigator.clipboard.writeText(publicLink);
    setIsCopied(!isCopied);
    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
      <ModalOverlay bg={'blackAlpha.700'} backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader color={'primary'}>Share link to Exercise</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={'primary'}>
            This link will open the exercise in a student view
          </Text>
          <InputGroup mt={'8px'}>
            <Input value={publicLink} readOnly textOverflow={'ellipsis'} />
            <InputRightElement>
              <IconButton
                aria-label=""
                variant={'ghost'}
                colorScheme="secondary"
                onClick={handleCopyButton}
                icon={<FaRegCopy />}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <Button
            colorScheme="secondary"
            onClick={handleCopyButton}
            leftIcon={<FaRegCopy />}
          >
            {!isCopied ? 'Copy link' : 'Copied!'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

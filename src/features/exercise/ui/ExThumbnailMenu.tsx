import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { ExThumbnailButton } from '../../../components/ExThumbNailButton';
import { FaRegTrashCan, FaRegShareFromSquare } from 'react-icons/fa6';

import { LSHandler } from '../../../utils/handleLocalStorage';
import { DeleteExercisePopUp } from '../../../components/DeleteExercisePopUp';
import { ShareExercisePopUp } from '../../../components/ShareExercisePopUp';
import { useDeleteExerciseMutation } from '@/app/lib/store/main-api/mutations/deleteExercise';
import { IExercise } from '@/entities/exercise';

export interface IExThumbnailMenuProps {
  exData: IExercise;
}

export const ExThumbnailMenu = (props: IExThumbnailMenuProps): JSX.Element => {
  const jwt = LSHandler.getJwt();
  const { exData } = props;
  const [deleteExercise, { data }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });
  const deleteHandler = useDisclosure();
  const shareHandler = useDisclosure();

  function handleDeleteButton(e: React.MouseEvent) {
    e.stopPropagation();
    deleteHandler.onOpen();
  }

  function handleShareButton(e: React.MouseEvent) {
    e.stopPropagation();
    shareHandler.onOpen();
  }

  return (
    <>
      <Menu closeOnBlur closeOnSelect placement={'bottom'}>
        <MenuButton as={ExThumbnailButton}></MenuButton>
        <MenuList bgColor={'background'}>
          <MenuItem onClick={handleShareButton}>
            <Icon as={FaRegShareFromSquare} mr={'8px'} />
            Share
          </MenuItem>
          <MenuItem onClick={handleDeleteButton} color={'error.base'}>
            <Icon as={FaRegTrashCan} mr={'8px'} />
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteExercisePopUp
        isOpen={deleteHandler.isOpen}
        onClose={deleteHandler.onClose}
        onOpen={deleteHandler.onOpen}
        id={exData._id}
      />
      <ShareExercisePopUp
        isOpen={shareHandler.isOpen}
        onClose={shareHandler.onClose}
        onOpen={shareHandler.onOpen}
        id={exData._id}
      />
    </>
  );
};

//ON HOVER REALISATION
// const { isOpen, onOpen, onClose } = useDisclosure();

// return (
//   <Menu isOpen={isOpen} onClose={onClose}>
//     <MenuButton as={ExThumbnailButton} onMouseOver={onOpen}></MenuButton>
//     <MenuList onMouseLeave={onClose}>
//       <MenuItem>Download</MenuItem>
//       <MenuItem>Create a Copy</MenuItem>
//       <MenuItem>Mark as Draft</MenuItem>
//       <MenuItem>Delete</MenuItem>
//       <MenuItem>Attend a Workshop</MenuItem>
//     </MenuList>
//   </Menu>
// );

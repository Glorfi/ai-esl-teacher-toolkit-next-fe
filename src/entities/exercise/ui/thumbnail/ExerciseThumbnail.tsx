import {
  HStack,
  VStack,
  Text,
  useDisclosure,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuItemProps,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { APP_PATHS } from '@/shared/constants/AppPaths';
// import { IExerciseSidbarThumbnailProps } from '../../model/models';
import { ExThumbnailButton } from '@/shared';
import { IExercise } from '../../model/models';
import { useEffect, useState } from 'react';

interface IExerciseSidbarThumbnailProps {
  data: IExercise;
  menuFeatures: IMenuFeatures[];
}

interface IMenuFeatures extends MenuItemProps {
  onMenuItem?: () => void;
  title: string;
  icon?: any;
  modal?: React.ComponentType<any>;
}

const ExerciseSidbarThumbnail = (
  props: IExerciseSidbarThumbnailProps
): JSX.Element => {
  const router = useRouter();
  const { id } = useParams();

  const { data, menuFeatures } = props;
  const [isSelected, setIsSelected] = useState<boolean>(id === data._id);
  const keywords = data.sentenceList.map((item) => {
    return item.answer;
  });
  const typeMap = {
    fillInGaps: 'Fill-in-gaps',
    multipleChoice: 'Multiple choice',
  };
  const type = typeMap[data.type];
  const redirectPath = APP_PATHS.DASHBOARD_EXERCISE.replace('/:id', '/');

  function handleThumbnailClick(e: any) {
    if (e.target.classList.contains('thumbNailButton')) {
      return;
    }
    router.push(`${redirectPath}${data._id}`);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const modalStates = menuFeatures.map(() => useDisclosure());

  function handleMenuItemClick(
    e: React.MouseEvent,
    index: number,
    onMenuItem?: () => void
  ) {
    e.stopPropagation();
    onMenuItem ? onMenuItem() : null;
    modalStates[index].onOpen();
  }

  useEffect(() => {
    setIsSelected(id === data._id);
  }, [id]);
  return (
    <>
      <HStack
        w={'100%'}
        as={'article'}
        justifyContent={'space-between'}
        minH={'max-content'}
        padding={'8px 12px 8px 16px'}
        _hover={{ backgroundColor: 'whiteOpacity.50' }}
        backgroundColor={isSelected ? 'whiteOpacity.50' : 'transparent'}
        cursor={'pointer'}
        borderRadius={'0.375rem'}
        onClick={handleThumbnailClick}
      >
        <VStack>
          <HStack width={'100%'}>
            {data.title ? (
              <Text
                fontSize={'sm'}
                color={'background'}
                fontWeight={'bold'}
                noOfLines={1}
              >
                {data.title}
              </Text>
            ) : (
              <>
                <Text
                  fontSize={'12px'}
                  color={'background'}
                  fontWeight={'light'}
                >
                  Keywords:
                </Text>
                <Text
                  fontSize={'12px'}
                  color={'background'}
                  fontWeight={'semibold'}
                  noOfLines={1}
                >
                  {keywords.join(', ')}
                </Text>
              </>
            )}
          </HStack>
          <HStack w={'100%'}>
            <Text fontSize={'10px'} color={'background'} fontWeight={'400'}>
              Skill:
            </Text>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'bold'}
              noOfLines={1}
            >
              {data.skill}
            </Text>
            <Text fontSize={'10px'} color={'background'} fontWeight={'400'}>
              Type:
            </Text>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'bold'}
              noOfLines={1}
            >
              {type}
            </Text>
          </HStack>
        </VStack>
        <Menu closeOnBlur closeOnSelect placement={'bottom-end'}>
          <MenuButton as={ExThumbnailButton}></MenuButton>
          <MenuList
            bgColor={'background'}
            minW={'120px'}
            p={'12px'}
            display={'flex'}
            flexDir={'column'}
            gap={'6px'}
          >
            {menuFeatures.map(
              ({ onMenuItem, title, icon, modal, ...rest }, index) => (
                <MenuItem
                  onClick={(e) => handleMenuItemClick(e, index, onMenuItem)}
                  {...rest}
                  key={`menu-item ${data._id}${index} `}
                  fontSize={'md'}
                  fontWeight={'400'}
                  p={0}
                  _hover={{
                    backgroundColor: 'unset',
                    fontWeight: 'bold',
                  }}
                  _focus={{
                    backgroundColor: 'unset',
                  }}
                >
                  {icon && (
                    <Icon
                      as={icon}
                      mr={'8px'}
                      key={`menu-icon ${data._id}${data._id}${index} `}
                    />
                  )}
                  {title}
                </MenuItem>
              )
            )}
          </MenuList>
        </Menu>
      </HStack>
      {menuFeatures.map(
        (feature, index) =>
          feature.modal && (
            <feature.modal
              isOpen={modalStates[index].isOpen}
              onClose={modalStates[index].onClose}
              id={data._id}
              key={`modal-${index}`}
            />
          )
      )}
    </>
  );
};

export default ExerciseSidbarThumbnail;

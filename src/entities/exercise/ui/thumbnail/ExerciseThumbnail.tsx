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
import { useRouter } from 'next/navigation';
import { IExercise } from '@/entities/exercise';
import { APP_PATHS } from '@/constants/AppPaths';
import { ExThumbnailButton } from '@/components/ExThumbNailButton';

//вынести в публичный интерфейс
export interface IExerciseSidbarThumbnailProps {
  data: IExercise;
  menuFeatures: IMenuFeatures[];
}

//вынести в публичный интерфейс
export interface IMenuFeatures extends MenuItemProps {
  feature: () => void;
  title: string;
  icon?: any;
}

export const ExerciseSidbarThumbnail = (
  props: IExerciseSidbarThumbnailProps
): JSX.Element => {
  const router = useRouter();
  const { data, menuFeatures } = props;
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

  function handleMenuItemClick(e: React.MouseEvent, feature: () => void) {
    e.stopPropagation();
    feature();
  }
  return (
    <HStack
      w={'100%'}
      as={'article'}
      justifyContent={'space-between'}
      minH={'max-content'}
      padding={'8px 12px 8px 16px'}
      _hover={{ backgroundColor: 'whiteOpacity.50' }}
      cursor={'pointer'}
      borderRadius={'0.375rem'}
      onClick={handleThumbnailClick}
    >
      <VStack>
        <HStack width={'100%'}>
          {data.title ? (
            <Text
              fontSize={'12px'}
              color={'background'}
              fontWeight={'semibold'}
            >
              {data.title}
            </Text>
          ) : (
            <>
              <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
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
          <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
            Skill:
          </Text>
          <Text
            fontSize={'12px'}
            color={'background'}
            fontWeight={'semibold'}
            noOfLines={1}
          >
            {data.skill}
          </Text>
          <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
            Type:
          </Text>
          <Text
            fontSize={'12px'}
            color={'background'}
            fontWeight={'semibold'}
            noOfLines={1}
          >
            {type}
          </Text>
        </HStack>
      </VStack>
      <Menu closeOnBlur closeOnSelect placement={'bottom'}>
        <MenuButton as={ExThumbnailButton}></MenuButton>
        <MenuList bgColor={'background'}>
          {menuFeatures.map(({ feature, title, icon, ...rest }, index) => (
            <MenuItem
              onClick={(e) => handleMenuItemClick(e, feature)}
              {...rest}
              key={`menu-item ${data._id}${index} `}
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
          ))}
          {/* <MenuItem onClick={handleShareButton}>
            <Icon as={FaRegShareFromSquare} mr={'8px'} />
            Share
          </MenuItem>
          <MenuItem onClick={handleDeleteButton} color={'error.base'}>
            <Icon as={FaRegTrashCan} mr={'8px'} />
            Delete
          </MenuItem> */}
        </MenuList>
      </Menu>
    </HStack>
  );
};

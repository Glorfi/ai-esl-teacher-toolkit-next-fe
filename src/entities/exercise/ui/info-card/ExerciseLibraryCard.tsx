import { APP_PATHS, ExThumbnailButton } from '@/shared';
import { useRouter } from 'next/navigation';
import { IExercise } from '../../model/models';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  HStack,
  VStack,
  Menu,
  Icon,
  MenuButton,
  MenuItem,
  MenuList,
  MenuItemProps,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { ExMenuCardButton } from '@/shared/ui/exercise-card-button/ExerciseMenuButton';

interface IExerciseLibraryCard {
  exersice: IExercise;
  TopicTag: React.ComponentType<any>;
  menuFeatures: IMenuFeatures[];
  AddTopicMenu: React.ComponentType<any>;
  onTopicFilter: any;
}

interface IMenuFeatures extends MenuItemProps {
  onMenuItem?: () => void;
  title: string;
  icon?: any;
  modal?: React.ComponentType<any>;
}

export const ExerciseLibraryCard = (
  props: IExerciseLibraryCard
): JSX.Element => {
  const { exersice, TopicTag, menuFeatures, AddTopicMenu, onTopicFilter } =
    props;
  const router = useRouter();
  const redirectPath = APP_PATHS.DASHBOARD_EXERCISE.replace('/:id', '/');

  const keywords = exersice.sentenceList.map((item) => {
    return item.answer;
  });

  function handleCardClick(e: any) {
    if (e.target.classList.contains('thumbNailButton')) {
      return;
    }
    router.push(`${redirectPath}${exersice._id}`);
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

  return (
    <>
      <Card
      //onClick={handleCardClick}
      >
        <CardBody p={'8px'}>
          <HStack justifyContent={'space-between'}>
            <Link
              as={NextLink}
              fontWeight={'bold'}
              href={`${redirectPath}${exersice._id}`}
              _hover={{ textDecoration: 'none' }}
              color={'primary'}
            >
              {exersice.title ? exersice.title : 'No title'}
            </Link>
            <Menu closeOnBlur closeOnSelect placement={'bottom'}>
              <MenuButton as={ExMenuCardButton}></MenuButton>
              <MenuList bgColor={'background'} minW={'150px'}>
                {menuFeatures.map(
                  ({ onMenuItem, title, icon, modal, ...rest }, index) => (
                    <MenuItem
                      onClick={(e) => handleMenuItemClick(e, index, onMenuItem)}
                      {...rest}
                      key={`menu-item ${exersice._id}${index} `}
                      fontSize={'14px'}
                    >
                      {icon && (
                        <Icon
                          as={icon}
                          mr={'8px'}
                          key={`menu-icon ${exersice._id}${exersice._id}${index} `}
                        />
                      )}
                      {title}
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>
          </HStack>
          <HStack mt={'8px'}>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              noOfLines={2}
            >
              Keywords:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'light'}
                color={'secondary.base'}
              >
                {keywords.join(', ')}
              </Text>
            </Text>
          </HStack>
          <Box mt={'8px'} alignItems={'flex-start'}>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              noOfLines={2}
            >
              Skill:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'light'}
                color={'secondary.base'}
              >
                {exersice.skill}
              </Text>
            </Text>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              noOfLines={2}
            >
              Type:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'light'}
                color={'secondary.base'}
              >
                {exersice.type === 'fillInGaps'
                  ? 'Fill-in gaps'
                  : exersice.type === 'multipleChoice'
                  ? 'Multiple Choice'
                  : ''}
              </Text>
            </Text>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              noOfLines={2}
            >
              Level:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'light'}
                color={'secondary.base'}
              >
                {exersice.studentLevel}
              </Text>
            </Text>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              noOfLines={2}
            >
              Learner Age:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'light'}
                color={'secondary.base'}
              >
                {exersice.studentAge}
              </Text>
            </Text>
          </Box>
          <HStack flexWrap={'wrap'} gap={'4px'}>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary'}
              //  noOfLines={2}
            >
              Topics:
            </Text>
            {exersice.topicList.map((topic) => {
              return (
                <TopicTag
                  topic={topic}
                  exerciseId={exersice._id}
                  key={`topic${topic._id}-exercise${exersice._id}`}
                  onFilterClick={onTopicFilter}
                />
              );
            })}
            <AddTopicMenu exercise={exersice} />
          </HStack>
        </CardBody>
      </Card>
      {menuFeatures.map(
        (feature, index) =>
          feature.modal && (
            <feature.modal
              isOpen={modalStates[index].isOpen}
              onClose={modalStates[index].onClose}
              id={exersice._id}
              key={`modal-${index}`}
            />
          )
      )}
    </>
  );
};

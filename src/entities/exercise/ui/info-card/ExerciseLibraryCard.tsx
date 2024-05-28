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
  Tag,
  Divider,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { ExMenuCardButton } from '@/shared/ui/exercise-card-button/ExerciseMenuButton';
import { capitalizeFirstLetter } from '@/shared/utils/capitalizeFirstLetter';
import { AiFillEdit } from 'react-icons/ai';

interface IExerciseLibraryCard {
  exersice: IExercise;
  TopicTag: React.ComponentType<any>;
  menuFeatures: IMenuFeatures[];
  AddTopicMenu: React.ComponentType<any>;
  onTopicFilter?: any;
  onTopicDelete?: any;
}

interface IMenuFeatures extends MenuItemProps {
  onMenuItem?: () => void;
  title: string;
  icon?: any;
  modal?: React.ComponentType<any>;
}

const ExerciseLibraryCard = (
  props: IExerciseLibraryCard
): JSX.Element => {
  const {
    exersice,
    TopicTag,
    menuFeatures,
    AddTopicMenu,
    onTopicFilter,
    onTopicDelete,
  } = props;
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
        variant={'outline'}
      >
        <CardBody p={'16px'}>
          <HStack justifyContent={'space-between'}>
            <Tag fontFamily={'alt'} variant={exersice.skill} p={'4px 8px'}>
              {capitalizeFirstLetter(exersice.skill)}
            </Tag>
            <ButtonGroup>
              <IconButton
                aria-label="edit"
                isRound
                icon={<AiFillEdit />}
                as={NextLink}
                href={`${redirectPath}${exersice._id}`}
                variant={'outline'}
                size={'xs'}
                color="secondary.base"
              />
              <Menu closeOnBlur closeOnSelect placement={'bottom-end'} isLazy>
                <MenuButton as={ExMenuCardButton}></MenuButton>
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
                        onClick={(e) =>
                          handleMenuItemClick(e, index, onMenuItem)
                        }
                        {...rest}
                        key={`menu-item ${exersice._id}${index} `}
                        fontSize={'xs'}
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
                            key={`menu-icon ${exersice._id}${exersice._id}${index} `}
                            // {title === 'Share' ?
                            //   transform: 'scale(-1,1)' :
                            // }
                            transform={`scale(${
                              title === 'Share' ? '-1,1' : 'unset'
                            })`}
                          />
                        )}
                        {title}
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </Menu>
            </ButtonGroup>
          </HStack>
          <VStack mt={'14px'} alignItems={'flex-start'} gap={'8px'}>
            <Text fontWeight={'bold'} color={'secondary.base'} fontSize={'lg'}>
              {exersice.title ? exersice.title : 'No title'}
            </Text>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              //color={'primary.base'}
              noOfLines={2}
            >
              Keywords:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'400'}
                // color={'secondary.base'}
              >
                {keywords.join(', ')}
              </Text>
            </Text>
          </VStack>
          <Divider m={'12px 0'} />
          <VStack alignItems={'flex-start'} gap={'6px'}>
            {/* <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary.base'}
              noOfLines={2}
            >
              Skill:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'400'}
                color={'primary.base'}
              >
                {exersice.skill}
              </Text>
            </Text> */}
            <Text
              fontSize={'sm'}
              fontWeight={'semibold'}
              color={'primary.base'}
              lineHeight={'129%'}
            >
              Learner level:{' '}
              <Text
                as={'span'}
                fontSize={'sm'}
                fontWeight={'400'}
                color={'primary.base'}
                lineHeight={'129%'}
              >
                {exersice.studentLevel}
              </Text>
            </Text>
            <Text
              fontSize={'sm'}
              fontWeight={'semibold'}
              color={'primary.base'}
              noOfLines={2}
              lineHeight={'129%'}
            >
              Learner Age:{' '}
              <Text
                as={'span'}
                fontSize={'sm'}
                fontWeight={'400'}
                color={'primary.base'}
                lineHeight={'129%'}
              >
                {exersice.studentAge}
              </Text>
            </Text>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary.base'}
              noOfLines={2}
              lineHeight={'129%'}
            >
              Type:{' '}
              <Text
                as={'span'}
                fontSize={'14px'}
                fontWeight={'400'}
                color={'primary.base'}
                lineHeight={'129%'}
              >
                {exersice.type === 'fillInGaps'
                  ? 'Fill-in gaps'
                  : exersice.type === 'multipleChoice'
                  ? 'Multiple Choice'
                  : ''}
              </Text>
            </Text>
          </VStack>
          <HStack flexWrap={'wrap'} gap={'4px'} mt={'6px'}>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'primary.base'}
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
                  onDelete={onTopicDelete}
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

export default ExerciseLibraryCard
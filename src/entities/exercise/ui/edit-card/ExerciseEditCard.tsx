import formatDate from '@/shared/utils/formatDate';
import {
  Text,
  Card,
  CardHeader,
  ButtonGroup,
  Tooltip,
  IconButton,
  VStack,
  HStack,
  CardBody,
  Divider,
  CardFooter,
  Box,
  IconButtonProps,
  Tag,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IExercise } from '../../model/models';
import { capitalizeFirstLetter } from '@/shared/utils/capitalizeFirstLetter';

interface IExerciseEditCard {
  exercise: IExercise;
  cardFeatures: ICardFeatures[];
  UpdatingBadge: React.ComponentType<any>;
  TitleDescriptionForm: React.ComponentType<any>;
  SentenceEditForm: React.ComponentType<any>;
  TopicTag: React.ComponentType<any>;
  OnTopicDelete: any;
  AddTopicMenu: React.ComponentType<any>;
  EditExerciseSettingsForm: React.ComponentType<any>;
}

interface ICardFeatures extends IconButtonProps {
  onClick: () => void;
  modal?: React.ComponentType<any>;
  toolTipTitle?: string;
}

export const ExerciseEditCard = (props: IExerciseEditCard): JSX.Element => {
  const {
    exercise,
    cardFeatures,
    UpdatingBadge,
    TitleDescriptionForm,
    SentenceEditForm,
    TopicTag,
    OnTopicDelete,
    AddTopicMenu,
    EditExerciseSettingsForm,
  } = props;
  const [exData, setExData] = useState<IExercise>(exercise);

  const typeMap = {
    fillInGaps: 'Fill-in-gaps',
    multipleChoice: 'Multiple choice',
  };
  const type = typeMap[exercise.type];

  return (
    <Card variant={'outline'}>
      <CardHeader
        p={'34px 28px 0'}
        position={'relative'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Tag fontFamily={'alt'} variant={exercise.skill} p={'4px 8px'}>
          {capitalizeFirstLetter(exercise.skill)}
        </Tag>
        <VStack gap={0} alignItems={'flex-end'}>
          <UpdatingBadge exercise={exercise} />
        </VStack>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'} p={'0 28px 0'}>
        <VStack mt={'34px'} w={'100%'} gap={0}>
          <TitleDescriptionForm exercise={exercise} />
          {exercise.sentenceList.map((item, index) => {
            return (
              <SentenceEditForm
                sentence={item}
                key={`${item._id}editform-${index}`}
                orderNumber={index}
              />
            );
          })}
          <ButtonGroup spacing={'0.1rem'} alignSelf={'flex-start'}>
            {cardFeatures.map(
              (
                {
                  'aria-label': area,
                  icon,
                  colorScheme,
                  toolTipTitle,
                  ...rest
                },
                index
              ) =>
                toolTipTitle ? (
                  <Tooltip
                    hasArrow
                    label={toolTipTitle}
                    placement="top"
                    key={`icon-button-${index}`}
                  >
                    <IconButton
                      aria-label={area}
                      icon={icon}
                      size={'sm'}
                      colorScheme={colorScheme}
                      variant={'ghost'}
                      isRound
                      {...rest}
                    />
                  </Tooltip>
                ) : (
                  <IconButton
                    aria-label={area}
                    icon={icon}
                    size={'sm'}
                    colorScheme={colorScheme}
                    variant={'ghost'}
                    isRound
                    {...rest}
                    key={`header-icon-button-${index}`}
                  />
                )
            )}
          </ButtonGroup>
        </VStack>
      </CardBody>
      <CardFooter
        display={'flex'}
        flexDirection={['column','row']}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        p={'34px 28px'}
      >
        <Box>
          <Text fontSize={'md'} fontWeight={'bold'} color={'primary.base'}>
            Exercise information:
          </Text>
          <Text fontWeight={'semibold'}>
            Learner Level:{' '}
            <Text as={'span'} fontWeight={'400'}>
              {exData.studentLevel}
            </Text>
          </Text>
          <Text fontWeight={'semibold'}>
            Learner Age:{' '}
            <Text as={'span'} fontWeight={'400'}>
              {exercise.studentAge}
            </Text>
          </Text>
          <Text fontWeight={'semibold'}>
            Type:{' '}
            <Text as={'span'} fontWeight={'400'}>
              {type}
            </Text>
          </Text>
          <HStack>
            <Text fontWeight={'semibold'}>Topics: </Text>
            {exercise.topicList.map((topic) => {
              return (
                <TopicTag
                  topic={topic}
                  exerciseId={exercise._id}
                  onDelete={OnTopicDelete}
                  key={topic._id}
                />
              );
            })}
            <AddTopicMenu exercise={exercise} />
          </HStack>
        </Box>
        <Box mt={['16px', 0]}>
          <Text fontSize={'16px'} fontWeight={'bold'}>
            Exercise settings:
          </Text>
          <EditExerciseSettingsForm exercise={exercise} />
        </Box>
      </CardFooter>
    </Card>
  );
};

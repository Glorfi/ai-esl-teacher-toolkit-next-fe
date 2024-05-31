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
} from '@chakra-ui/react';
import { useState } from 'react';
import { IExercise } from '../../model/models';

interface IExerciseEditCard {
  exercise: IExercise;
  headerIconFeatures: IHeaderIconFeatures[];
  UpdatingBadge: React.ComponentType<any>;
  TitleDescriptionForm: React.ComponentType<any>;
  SentenceEditForm: React.ComponentType<any>;
  TopicTag: React.ComponentType<any>;
  OnTopicDelete: any;
  AddTopicMenu: React.ComponentType<any>;
  EditExerciseSettingsForm: React.ComponentType<any>;
}

interface IHeaderIconFeatures extends IconButtonProps {
  onClick: () => void;
  modal?: React.ComponentType<any>;
  toolTipTitle?: string;
}

export const ExerciseEditCard = (props: IExerciseEditCard): JSX.Element => {
  const {
    exercise,
    headerIconFeatures,
    UpdatingBadge,
    TitleDescriptionForm,
    SentenceEditForm,
    TopicTag,
    OnTopicDelete,
    AddTopicMenu,
    EditExerciseSettingsForm,
  } = props;
  const [exData, setExData] = useState<IExercise>(exercise);

  return (
    <Card>
      <CardHeader
        p={'20px 20px 0'}
        position={'relative'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup spacing={'0.1rem'}>
          {headerIconFeatures.map(
            (
              { 'aria-label': area, icon, colorScheme, toolTipTitle, ...rest },
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
        <VStack gap={0} alignItems={'flex-end'}>
          <HStack alignItems={'flex-end'} gap={0}>
            <UpdatingBadge />
          </HStack>
          <Text fontSize={'8px'} color={'secondary.200'}>
            Updated: {formatDate(exercise.updatedAt)}
          </Text>
          <Text fontSize={'8px'} color={'secondary.200'}>
            Created: {formatDate(exercise.createdAt)}
          </Text>
        </VStack>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'} p={'0 20px 0'}>
        <Divider m={'8px 0'} />
        <TitleDescriptionForm exercise={exercise} />
        <Box display={'flex'} flexDirection={'column'} pt={'20px'}>
          {exercise.sentenceList.map((item, index) => {
            return (
              <SentenceEditForm
                sentence={item}
                key={`${item._id}editform-${index}`}
              />
            );
          })}
        </Box>
      </CardBody>
      <CardFooter
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
      >
        <Divider m={'0 0 8px'} />
        <Text fontSize={'16px'} fontWeight={'bold'} color={'primary.base'}>
          Exercise information:
        </Text>
        <Text>
          Skill:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exData.skill}
          </Text>
        </Text>
        <Text>
          Level:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exData.studentLevel}
          </Text>
        </Text>
        <Text>
          Learner's age:{' '}
          <Text as={'span'} color={'secondary.base'}>
            {exercise.studentAge}
          </Text>
        </Text>
        <HStack>
          <Text>Topics: </Text>
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
        <Divider m={'20px 0 8px'} />
        <Text fontSize={'16px'} fontWeight={'bold'}>
          Exercise settings:
        </Text>
        <EditExerciseSettingsForm exercise={exercise} />
      </CardFooter>
    </Card>
  );
};

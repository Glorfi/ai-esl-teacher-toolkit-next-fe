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
        {/* <Divider m={'8px 0'} /> */}
        <VStack mt={'34px'} w={'100%'} gap={'16px'}>
          <TitleDescriptionForm exercise={exercise} />
          {exercise.sentenceList.map((item, index) => {
            return (
              <SentenceEditForm
                sentence={item}
                key={`${item._id}editform-${index}`}
              />
            );
          })}
        </VStack>
        {/* <Box display={'flex'} flexDirection={'column'} pt={'20px'}>

        </Box> */}
      </CardBody>
      <CardFooter
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        p={'0 28px 0'}
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

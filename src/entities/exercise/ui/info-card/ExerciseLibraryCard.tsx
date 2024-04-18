import { APP_PATHS } from '@/shared';
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
} from '@chakra-ui/react';

interface IExerciseLibraryCard {
  exersice: IExercise;
  TopicTag: React.ComponentType<any>;
}

export const ExerciseLibraryCard = (
  props: IExerciseLibraryCard
): JSX.Element => {
  const { exersice, TopicTag } = props;
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
  return (
    <Card onClick={handleCardClick} cursor={'pointer'}>
      <CardBody p={'8px'}>
        <Text fontWeight={'bold'}>
          {exersice.title ? exersice.title : 'No title'}
        </Text>
        <HStack mt={'8px'}>
          <Text
            fontSize={'14px'}
            fontWeight={'semibold'}
            color={'secondary.base'}
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
            color={'secondary.base'}
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
            color={'secondary.base'}
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
            color={'secondary.base'}
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
        <HStack flexWrap={'wrap'}>
          <Text
            fontSize={'14px'}
            fontWeight={'semibold'}
            color={'secondary.base'}
            noOfLines={2}
          >
            Topics:
          </Text>
          {exersice.topicList.map((topic) => {
            return (
              <TopicTag
                topic={topic}
                key={`topic${topic._id}-exercise${exersice._id}`}
              />
            );
          })}
        </HStack>
      </CardBody>
    </Card>
  );
};

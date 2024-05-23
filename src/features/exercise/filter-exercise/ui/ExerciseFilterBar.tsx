import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  Button,
  ButtonGroup,
  HStack,
  Stack,
  StackProps,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  removeSkill,
  removeType,
  resetFilterOptions,
  resetStringOption,
  toggleTopic,
} from '../model/filter-options-router';
import { capitalizeFirstLetter } from '@/shared/utils/capitalizeFirstLetter';
import { getUniqueUserTopics } from '../model/useUsersTopics';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';

//interface IExerciseFilterBar extends StackProps{}

export const ExerciseFilterBar = (props: StackProps): JSX.Element => {
  const { studentLevel, studentAge, type, skill, topicList } = useAppSelector(
    (state) => state.filterOptions
  );
  const exerciseList = useAppSelector((state) => state.exerciseList);
  const dispatch = useAppDispatch();
  const userTopicList = getUniqueUserTopics(exerciseList);

  return (
    <HStack {...props} flexWrap={'wrap'}>
      <Text fontWeight={'bold'} mr={'18px'} minH={'28px'}>
        Filtered by:
      </Text>
      {studentLevel && (
        <Tag colorScheme="primary" variant={'outline'} fontFamily={'alt'}>
          <TagLabel>{studentLevel.slice(-2)}</TagLabel>
          <TagCloseButton
            onClick={() => dispatch(resetStringOption('studentLevel'))}
          />
        </Tag>
      )}
      {studentAge && (
        <Tag colorScheme="primary" variant={'outline'} fontFamily={'alt'}>
          <TagLabel>{studentAge.split(' ')[0]}</TagLabel>
          <TagCloseButton
            onClick={() => dispatch(resetStringOption('studentAge'))}
          />
        </Tag>
      )}
      {type &&
        type.map((item, index) => (
          <Tag
            colorScheme="primary"
            variant={'outline'}
            key={`filterBar${item}${index}`}
            fontFamily={'alt'}
          >
            <TagLabel>
              {item === 'fillInGaps'
                ? 'Fill-in gaps'
                : item === 'multipleChoice'
                ? 'Multiple Choice'
                : null}
            </TagLabel>
            <TagCloseButton
              onClick={() => dispatch(removeType(item.toString()))}
            />
          </Tag>
        ))}
      {skill &&
        skill.map((item, index) => (
          <Tag
            colorScheme="primary"
            variant={'outline'}
            key={`filterBar${item}${index}`}
            fontFamily={'alt'}
          >
            <TagLabel>{capitalizeFirstLetter(item.toString())}</TagLabel>
            <TagCloseButton
              onClick={() => dispatch(removeSkill(item.toString()))}
            />
          </Tag>
        ))}
      {topicList &&
        topicList.map((item, index) => {
          const foundTopic = userTopicList.find((topic) => topic._id === item);
          return (
            <Tag
              colorScheme="primary"
              variant={'outline'}
              key={`filterBar${item}${index}`}
              fontFamily={'alt'}
            >
              <TagLabel>{foundTopic ? foundTopic.name : 'Unknown'}</TagLabel>
              <TagCloseButton
                onClick={() => dispatch(toggleTopic(item.toString()))}
              />
            </Tag>
          );
        })}

      <Button
        colorScheme="error"
        size={'xs'}
        fontFamily={'alt'}
        leftIcon={<DeleteIcon color={'white'} />}
        fontWeight={'medium'}
        onClick={() => dispatch(resetFilterOptions())}
      >
        Reset Filters
      </Button>
    </HStack>
  );
};

import { CheckboxButton } from '@/shared';
import {
  VStack,
  Text,
  CheckboxGroup,
  HStack,
  useCheckboxGroup,
  Select,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getUniqueUserTopics } from '../model/useUsersTopics';
import { IFilterOptions } from '../model/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { setFilterOptions as setFilterConfig } from '../model/filter-options-router';

export const ExerciseFilterForm = (): JSX.Element => {
  const reduxFormValues = useAppSelector((state) => state.filterOptions);
  const exercisesList = useAppSelector((state) => state.exerciseList);
  const [filterOptions, setFilterOptions] =
    useState<IFilterOptions>(reduxFormValues);
  const {
    value: skillValues,
    getCheckboxProps: getSkillCheckBoxProps,
    setValue: setSkillValue,
  } = useCheckboxGroup();
  const {
    value: typeValues,
    getCheckboxProps: getTypeCheckBoxProps,
    setValue: setTypeValue,
  } = useCheckboxGroup();
  const {
    value: topicValues,
    getCheckboxProps: getTopicCheckBoxProps,
    setValue: setTopicValue,
  } = useCheckboxGroup();

  const [allowTopicUpdate, setAllowTopicUpdate] = useState<boolean>(true);

  //const topicList = useSelector(userTopicsSelector); // MEMOIZED VARIANT
  const topicList = getUniqueUserTopics(exercisesList); // NO MEMO VARIANT

  const dispatch = useAppDispatch();

  const resetForm = () => {
    setFilterOptions({
      studentAge: '',
      studentLevel: '',
      skill: [],
      type: [],
      topicList: [],
    });
    setSkillValue([]);
    setTypeValue([]);
    setTopicValue([]);
  };

  useEffect(() => {
    setFilterOptions({ ...filterOptions, skill: skillValues });
  }, [skillValues]);

  useEffect(() => {
    setFilterOptions({ ...filterOptions, type: typeValues });
  }, [typeValues]);

  useEffect(() => {
    setFilterOptions({ ...filterOptions, topicList: topicValues });
  }, [topicValues]);

  useEffect(() => {
    if (allowTopicUpdate) {
      dispatch(setFilterConfig(filterOptions));
    }
  }, [filterOptions]);

  useEffect(() => {
    if (allowTopicUpdate) {
      setTopicValue(reduxFormValues.topicList);
    }
  }, [reduxFormValues.topicList, allowTopicUpdate]);

  useEffect(() => {
    setAllowTopicUpdate(false);
    const timeout = setTimeout(() => {
      setAllowTopicUpdate(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [reduxFormValues.topicList]);

  useEffect(() => {
    //  setFilterOptions(reduxFormValues);
    console.log('Render!');

    setSkillValue(reduxFormValues.skill);
    setTypeValue(reduxFormValues.type);
    setTopicValue(reduxFormValues.topicList);
  }, []);

  return (
    <VStack
      flexGrow={1}
      alignItems={'flex-start'}
      w={'100%'}
      padding={'0 16px'}
      as={'form'}
    >
      <Text
        fontSize={'14px'}
        color={'background'}
        fontWeight={'medium'}
        textAlign={'left'}
        w={'100%'}
      >
        Filter Exercise
      </Text>
      <Text color={'background'} fontSize={'14px'} fontWeight={'bold'}>
        Skill
      </Text>
      <CheckboxGroup>
        <HStack>
          <CheckboxButton
            {...getSkillCheckBoxProps({ value: 'vocabulary' })}
            title={'Vocabulary'}
          />
          <CheckboxButton
            {...getSkillCheckBoxProps({ value: 'grammar' })}
            title={'Grammar'}
          />
        </HStack>
      </CheckboxGroup>
      <Text color={'background'} fontSize={'14px'} fontWeight={'bold'}>
        Type
      </Text>
      <CheckboxGroup>
        <HStack>
          <CheckboxButton
            {...getTypeCheckBoxProps({ value: 'fillInGaps' })}
            title={'Fill-in gaps'}
          />
          <CheckboxButton
            {...getTypeCheckBoxProps({ value: 'multipleChoice' })}
            title={'Multiple Choice'}
          />
        </HStack>
      </CheckboxGroup>
      <Text color={'background'} fontSize={'14px'} fontWeight={'bold'}>
        Learner Level
      </Text>
      <Select
        onChange={(e) =>
          setFilterOptions({ ...filterOptions, studentLevel: e.target.value })
        }
        backgroundColor={'background'}
        size={'sm'}
        value={filterOptions.studentLevel}
      >
        <option value={''}></option>
        <option value={'Beginner A1'}>Beginner A1</option>
        <option value={'Elementary A2'}>Elementary A2</option>
        <option value={'Intermediate B1'}>Intermediate B1</option>
        <option value={'Upper-Intermediate B2'}>Upper-Intermediate B2</option>
        <option value={'Advanced C1'}>Advanced C1</option>
      </Select>
      <Text color={'background'} fontSize={'14px'} fontWeight={'bold'}>
        Learner Age
      </Text>
      <Select
        onChange={(e) =>
          setFilterOptions({ ...filterOptions, studentAge: e.target.value })
        }
        backgroundColor={'background'}
        size={'sm'}
        value={filterOptions.studentAge}
      >
        <option value={''}></option>
        <option value={'Children 7-12 y.o.'}>Children 7-12 y.o.</option>
        <option value={'Teenagers 13-20 y.o.'}>Teenagers 13-20 y.o.</option>
        <option value={'Adults 20+ y.o'}>Adults 20+ y.o</option>
      </Select>
      <Text color={'background'} fontSize={'14px'} fontWeight={'bold'}>
        Topics
      </Text>
      <CheckboxGroup>
        <HStack flexWrap={'wrap'}>
          {topicList.map((topic) => (
            <CheckboxButton
              {...getTopicCheckBoxProps({ value: topic._id })}
              title={topic.name}
              key={`checkbox-${topic.name}`}
            />
          ))}
        </HStack>
      </CheckboxGroup>
      <Button
        mt={'auto'}
        w={'100%'}
        onClick={resetForm}
        variant={'ghost'}
        colorScheme="whiteOpacity"
        size={'sm'}
      >
        Reset filters
      </Button>
    </VStack>
  );
};

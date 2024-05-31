import { CheckboxButton } from '@/shared';
import {
  VStack,
  Text,
  CheckboxGroup,
  HStack,
  useCheckboxGroup,
  Select,
  Button,
  Icon,
  StackProps,
  ButtonGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './ExerciseFilterForm.css';

import {
  getUniqueUserTopics,
  userTopicsSelector,
} from '../model/useUsersTopics';
import { IFilterOptions } from '../model/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { setFilterOptions as setFilterConfig } from '../model/filter-options-router';
import { BiSliderAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';

export const ExerciseFilterForm = (props: StackProps): JSX.Element => {
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

  const topicList = useSelector(userTopicsSelector); // MEMOIZED VARIANT
  //const topicList = getUniqueUserTopics(exercisesList); // NO MEMO VARIANT

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
    if (
      allowTopicUpdate &&
      JSON.stringify(filterOptions) !== JSON.stringify(reduxFormValues)
    ) {
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
    if (reduxFormValues.studentLevel === '') {
      setFilterOptions({ ...filterOptions, studentLevel: '' });
    }
  }, [reduxFormValues.studentLevel]);

  useEffect(() => {
    if (reduxFormValues.studentAge === '') {
      setFilterOptions({ ...filterOptions, studentAge: '' });
    }
  }, [reduxFormValues.studentAge]);

  useEffect(() => {
    if (reduxFormValues.type.length !== filterOptions.type.length) {
      setTypeValue(reduxFormValues.type);
    }
  }, [reduxFormValues.type]);

  useEffect(() => {
    if (reduxFormValues.skill.length !== filterOptions.skill.length) {
      setSkillValue(reduxFormValues.skill);
    }
  }, [reduxFormValues.skill]);

  useEffect(() => {
    if (
      allowTopicUpdate &&
      JSON.stringify(reduxFormValues) ===
        JSON.stringify({
          studentAge: '',
          studentLevel: '',
          skill: [],
          type: [],
          topicList: [],
        })
    ) {
      resetForm();
      setAllowTopicUpdate(false);
      const timeout = setTimeout(() => {
        setAllowTopicUpdate(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [reduxFormValues]);

  useEffect(() => {
    //  setFilterOptions(reduxFormValues);
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
      maxH={[
        'calc(100% - 150px)',
        'calc(100%- 150px)',
        'calc(100% - 150px)',
        'unset',
      ]}
      gap={0}
      {...props}
    >
      <HStack w={'100%'}>
        <Icon
          as={BiSliderAlt}
          color={'background'}
          transform={'rotate(-90deg)'}
        />
        <Text
          fontSize={'16px'}
          color={'background'}
          fontWeight={'semibold'}
          textAlign={'left'}
          w={'100%'}
        >
          Filter Exercise
        </Text>
      </HStack>
      <VStack
        width={'100%'}
        alignItems={'flex-start'}
        gap={['14px', '18px']}
        mt={['14px', '22px']}
      >
        <VStack alignItems={'flex-start'} w={'100%'} gap={'6px'}>
          <Text color={'background'} fontSize={'14px'} fontWeight={'semibold'}>
            Learner Level
          </Text>
          <Select
            onChange={(e) =>
              setFilterOptions({
                ...filterOptions,
                studentLevel: e.target.value,
              })
            }
            backgroundColor={'background'}
            size={'sm'}
            value={filterOptions.studentLevel}
            borderRadius={6}
          >
            <option
              value={''}
              // className="selectPlaceholder"
              // style={{ color: '#8c8c8c !important' }}
              hidden
            ></option>
            <option value={'Beginner A1'}>Beginner A1</option>
            <option value={'Elementary A2'}>Elementary A2</option>
            <option value={'Intermediate B1'}>Intermediate B1</option>
            <option value={'Upper-Intermediate B2'}>
              Upper-Intermediate B2
            </option>
            <option value={'Advanced C1'}>Advanced C1</option>
          </Select>
        </VStack>
        <VStack alignItems={'flex-start'} w={'100%'} gap={'6px'}>
          <Text color={'background'} fontSize={'14px'} fontWeight={'semibold'}>
            Learner Age
          </Text>
          <Select
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, studentAge: e.target.value })
            }
            backgroundColor={'background'}
            size={'sm'}
            value={filterOptions.studentAge}
            borderRadius={6}
          >
            <option value={''}></option>
            <option value={'Children 7-12 y.o.'}>Children 7-12 y.o.</option>
            <option value={'Teenagers 13-20 y.o.'}>Teenagers 13-20 y.o.</option>
            <option value={'Adults 20+ y.o'}>Adults 20+ y.o</option>
          </Select>
        </VStack>
        <VStack alignItems={'flex-start'} w={'100%'} gap={'6px'}>
          <Text color={'background'} fontSize={'14px'} fontWeight={'semibold'}>
            Type
          </Text>
          <CheckboxGroup>
            <HStack gap="6px">
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
        </VStack>
        <VStack alignItems={'flex-start'} w={'100%'} gap={'6px'}>
          <Text color={'background'} fontSize={'14px'} fontWeight={'semibold'}>
            Skill
          </Text>
          <CheckboxGroup>
            <HStack gap="6px">
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
        </VStack>

        <VStack alignItems={'flex-start'} w={'100%'} gap={'6px'}>
          <Text color={'background'} fontSize={'14px'} fontWeight={'semibold'}>
            Topics
          </Text>
          <CheckboxGroup>
            <HStack
              flexWrap={'wrap'}
              className="scroll"
              maxH={['80px', '120px']}
              overflowY={'scroll'}
              gap="6px"
            >
              {topicList.map((topic) => (
                <CheckboxButton
                  {...getTopicCheckBoxProps({ value: topic._id })}
                  title={topic.name}
                  key={`checkbox-${topic.name}`}
                />
              ))}
            </HStack>
          </CheckboxGroup>
        </VStack>
        <ButtonGroup
          fontFamily={'alt'}
          w={'100%'}
          display={['inline-flex', 'none']}
          justifyContent={'space-between'}
        >
          <Button w={'100%'} size={'xs'} as={'div'} colorScheme="secondary">
            Find exercises
          </Button>
          <Button
            w={'100%'}
            size={'xs'}
            colorScheme="error"
            leftIcon={<DeleteIcon />}
            onClick={resetForm}
          >
            Reset filters{' '}
          </Button>
        </ButtonGroup>
        {/* <Button
          mt={'auto'}
          w={'100%'}
          onClick={resetForm}
          variant={'ghost'}
          colorScheme="whiteOpacity"
          size={'sm'}
        >
          Reset filters
        </Button> */}
      </VStack>
    </VStack>
  );
};

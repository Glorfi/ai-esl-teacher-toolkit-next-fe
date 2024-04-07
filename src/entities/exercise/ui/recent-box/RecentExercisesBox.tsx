//import { ExerciseThumbnail } from '@/components/SideBarExerciseThumbnail';

import { useEffect, useState } from 'react';
import './recentExercisesBox.css';
import { VStack, Text } from '@chakra-ui/react';
import { getTodayExercises } from '@/entities/exercise/lib/getTodayExercises';
import { getLastSevenDaysExercises } from '@/entities/exercise/lib/getLastSevenDaysExercises';
import { getRestExercises } from '@/entities/exercise/lib/getRestExercises';
import { getYesterdayExercises } from '@/entities/exercise/lib/getYesterdayExercises';
import { useAppSelector } from '@/app/lib/hooks/hooks';
import { IExercise } from '../../model/models';
import { IExerciseSidbarThumbnailProps, IMenuFeatures } from '../thumbnail/ExerciseThumbnail';

interface RecentExercisesBoxProps {
  ExerciseThumbNail: React.ComponentType<IExerciseSidbarThumbnailProps>;
  ThumbNailMenuFeatures: IMenuFeatures[];
}

export const RecentExercisesBox = (
  props: RecentExercisesBoxProps
): JSX.Element => {
  const { ExerciseThumbNail, ThumbNailMenuFeatures } = props;
  const exList = useAppSelector((state) => state.exerciseList);
  const [todayExList, setTodayExList] = useState<IExercise[] | null>(null);
  const [yesterdayExList, setYesterdayExList] = useState<IExercise[] | null>(
    null
  );
  const [sevenDaysExList, setSevenDaysExList] = useState<IExercise[] | null>(
    null
  );
  const [restExList, setRestExList] = useState<IExercise[] | null>(null);

  useEffect(() => {
    setTodayExList(getTodayExercises(exList));
    setYesterdayExList(getYesterdayExercises(exList));
    setSevenDaysExList(getLastSevenDaysExercises(exList));
    setRestExList(getRestExercises(exList));
  }, [exList]);
  return (
    <>
      <Text
        fontSize={'14px'}
        color={'background'}
        fontWeight={'medium'}
        textAlign={'left'}
        w={'100%'}
        padding={'0 16px'}
      >
        Recent exercises:
      </Text>
      <VStack
        maxH={'calc(100vh - 174px)'}
        overflowY={'scroll'}
        className="thumbnailStack"
        w={'100%'}
      >
        {todayExList && todayExList.length > 0 ? (
          <>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'medium'}
              textAlign={'right'}
              w={'100%'}
              padding={'0 16px'}
            >
              Today
            </Text>
            {todayExList?.map((ex) => {
              return <ExerciseThumbNail data={ex} key={ex._id} menuFeatures={ThumbNailMenuFeatures} />;
            })}
          </>
        ) : null}
        {yesterdayExList && yesterdayExList.length > 0 ? (
          <>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'medium'}
              textAlign={'right'}
              w={'100%'}
              padding={'0 16px'}
            >
              Yesterday
            </Text>
            {yesterdayExList?.map((ex) => {
              return <ExerciseThumbNail data={ex} key={ex._id} menuFeatures={ThumbNailMenuFeatures} />;
            })}
          </>
        ) : null}
        {sevenDaysExList && sevenDaysExList.length > 0 ? (
          <>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'medium'}
              textAlign={'right'}
              w={'100%'}
              padding={'0 16px'}
            >
              Previous 7 Days
            </Text>
            {sevenDaysExList?.map((ex) => {
              return <ExerciseThumbNail data={ex} key={ex._id} menuFeatures={ThumbNailMenuFeatures}/>;
            })}
          </>
        ) : null}
        {restExList && restExList.length > 0 ? (
          <>
            <Text
              fontSize={'10px'}
              color={'background'}
              fontWeight={'medium'}
              textAlign={'right'}
              w={'100%'}
              padding={'0 16px'}
            >
              Earlier
            </Text>
            {restExList?.map((ex) => {
              return <ExerciseThumbNail data={ex} key={ex._id} menuFeatures={ThumbNailMenuFeatures} />;
            })}
          </>
        ) : null}
      </VStack>
    </>
  );
};

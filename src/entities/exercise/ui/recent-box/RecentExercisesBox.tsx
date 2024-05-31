//import { ExerciseThumbnail } from '@/components/SideBarExerciseThumbnail';

import { useEffect, useState } from 'react';
import './recentExercisesBox.css';
import { VStack, Text } from '@chakra-ui/react';
import { getTodayExercises } from '@/entities/exercise/lib/getTodayExercises';
import { getLastSevenDaysExercises } from '@/entities/exercise/lib/getLastSevenDaysExercises';
import { getRestExercises } from '@/entities/exercise/lib/getRestExercises';
import { getYesterdayExercises } from '@/entities/exercise/lib/getYesterdayExercises';
import { useAppSelector } from '@/shared/hooks/hooks';

import {
  IExercise,
  IExerciseSidbarThumbnailProps,
  IMenuFeatures,
} from '../../model/models';
import RenderOnViewportEntry from '@/shared/ui/render-on-view-port-entry/RenderOnViewPortEntry';

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
    <VStack
      flexGrow={1}
      alignItems={'flex-start'}
      w={'100%'}
      maxH={[
        'calc(100% - 150px)',
        'calc(100%- 150px)',
        'calc(100% - 150px)',
        'unset',
      ]}
    >
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
        maxH={'calc(100vh - 235px)'}
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
              return (
                <RenderOnViewportEntry
                  threshold={0.25}
                  style={{ minHeight: '60px', width: '100%' }}
                  key={`renderwrapper thumbnail ${ex._id}`}
                >
                  <ExerciseThumbNail
                    data={ex}
                    key={ex._id}
                    menuFeatures={ThumbNailMenuFeatures}
                  />
                </RenderOnViewportEntry>
              );
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
              return (
                <RenderOnViewportEntry
                  threshold={0.25}
                  style={{ minHeight: '60px', width: '100%' }}
                  key={`renderwrapper thumbnail ${ex._id}`}
                >
                  <ExerciseThumbNail
                    data={ex}
                    key={ex._id}
                    menuFeatures={ThumbNailMenuFeatures}
                  />
                </RenderOnViewportEntry>
              );
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
              return (
                <RenderOnViewportEntry
                  threshold={0.25}
                  style={{ minHeight: '60px', width: '100%' }}
                  key={`renderwrapper thumbnail ${ex._id}`}
                >
                  <ExerciseThumbNail
                    data={ex}
                    key={ex._id}
                    menuFeatures={ThumbNailMenuFeatures}
                  />
                </RenderOnViewportEntry>
              );
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
              return (
                <RenderOnViewportEntry
                  threshold={0.25}
                  style={{ minHeight: '60px', width: '100%' }}
                  key={`renderwrapper thumbnail ${ex._id}`}
                >
                  <ExerciseThumbNail
                    data={ex}
                    key={ex._id}
                    menuFeatures={ThumbNailMenuFeatures}
                  />
                </RenderOnViewportEntry>
              );
            })}
          </>
        ) : null}
      </VStack>
    </VStack>
  );
};

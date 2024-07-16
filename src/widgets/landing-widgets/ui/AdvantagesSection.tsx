import { LandingCard } from '@/shared/ui/containers/LandingCard';
import { VStack, Text, Grid, Card } from '@chakra-ui/react';

export const AdvantagesSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      id="AdvantagesSection"
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={['116px', '156px']}
      w={'100%'}
      scrollMarginTop={'94px'}
    >
      <Text
        as="h2"
        color={'primary.base'}
        fontSize={['32px', '64px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Advantages of using the platform
      </Text>
      <Grid
        gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        gap={'24px'}
        mt={['32px', '48px']}
        w={'100%'}
      >
        <LandingCard
          variant={'landingLight'}
          cardNumber={'1.'}
          cardTitle="Personalized exercises"
          cardText="Personalized exercises tailored to each student's level and needs."
        />
        <LandingCard
          variant={'landingLight'}
          cardNumber={'2.'}
          cardTitle="Time savings"
          cardText="Save time on creating exercises, dedicate more time to engaging with students."
          gridRow={2}
        />
        <LandingCard
          variant={'landingDark'}
          cardNumber={'3.'}
          cardTitle="High-quality exercises"
          cardText="High-quality exercises that enhance effective learning and student motivation."
          gridRow={['3', '1/3']}
          graphicElement="circles"
          justifyContent={'space-between'}
        />
        <LandingCard
          variant={'landingLight'}
          cardNumber={'4.'}
          cardTitle="Dynamic lesson adaptation"
          cardText="Students can check their answers directly on the platform, promoting self-assessment, and allowing them to identify and address their mistakes immediately."
          gridRow={['4','1/3']}
          graphicElement="horizontalTwist"
        />
      </Grid>
    </VStack>
  );
};

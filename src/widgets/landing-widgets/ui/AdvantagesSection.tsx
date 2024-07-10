import { LandingCard } from '@/shared/ui/containers/LandingCard';
import { VStack, Text, Grid, Card } from '@chakra-ui/react';

export const AdvantagesSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'156px'}
      w={'100%'}
    >
      <Text
        as="h2"
        color={'primary.base'}
        fontSize={['2xl', '64px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Advantages of using the platform
      </Text>
      <Grid
        gridTemplateColumns={'1fr 360px 360px'}
        gap={'24px'}
        mt={'48px'}
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
          gridRow={'1/3'}
          graphicElement="circles"
          justifyContent={'space-between'}
        />
        <LandingCard
          variant={'landingLight'}
          cardNumber={'4.'}
          cardTitle="Dynamic lesson adaptation"
          cardText="Students can check their answers directly on the platform, promoting self-assessment, and allowing them to identify and address their mistakes immediately."
          gridRow={'1/3'}
          graphicElement="horizontalTwist"
        />
        {/* <Card variant={'outline'} p={'32px'} borderRadius={'16px'}>
          <Text fontWeight={'600'}>1.</Text>
          <Text as={'h3'} mt={'38px'} fontWeight={'bold'} fontSize={'2xl'}>
            Personalized exercises
          </Text>
          <Text fontWeight={'500'} mt={'12px'}>
            Personalized exercises tailored to each student's level and needs.
          </Text>
        </Card>
        <Card variant={'outline'} gridRow={2} p={'32px'} borderRadius={'16px'}>
          <Text fontWeight={'600'}>2.</Text>
        </Card>
        <Card
          variant={'outline'}
          gridRow={'1/3'}
          p={'32px'}
          borderRadius={'16px'}
        >
          <Text fontWeight={'600'}>3.</Text>
        </Card>
        <Card
          variant={'outline'}
          gridRow={'1/3'}
          p={'32px'}
          borderRadius={'16px'}
        >
          <Text fontWeight={'600'}>4.</Text>
        </Card> */}
      </Grid>
    </VStack>
  );
};

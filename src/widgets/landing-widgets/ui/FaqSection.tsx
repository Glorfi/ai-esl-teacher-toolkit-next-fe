import { AddIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import {
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

export const FaqSection = (): JSX.Element => {
  return (
    <VStack
      as={'section'}
      id='FaqSection'
      gap={0}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'156px'}
      w={'100%'}
      scrollMarginTop={"94px"}
    >
      <Text
        as="h2"
        color={'primary.base'}
        fontSize={['2xl', '64px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Frequently Asked Questions
      </Text>
      <Text
        mt={'16px'}
        as="h3"
        color={'primary.base'}
        fontSize={['md', '20px']}
        fontWeight={'bold'}
        //  lineHeight={'80px'}
        textAlign={'center'}
      >
        Find detailed answers to the most commonly asked questions.
      </Text>
      <Accordion mt={'48px'} w={'100%'} allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  1. Can I customize the generated exercises?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  Yes, you can fully customize the generated exercises. You can
                  modify sentences, options, hints, and answers. As we expand
                  our functionality, you will also be able to customize new
                  types of activities.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  2. Can the app generate exercises based on specific topics or
                  themes?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  Absolutely. For vocabulary exercises, you can select the words
                  you want to include. You can also specify the topic to ensure
                  the words are used in the intended context. For upcoming
                  grammar exercises, you’ll be able to choose the specific
                  grammar topic as well.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  3. How accurate and reliable are the AI-generated exercises?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  While the AI-generated exercises are generally reliable, we
                  highly recommend reviewing the content to ensure it meets your
                  standards. The AI is quite advanced but still benefits from
                  human oversight.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  4. Сan I make exercises for students of different level?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  Yes, you can create exercises tailored to different
                  proficiency levels, making it easy to cater to the diverse
                  needs of your students.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  5. How many people can I send the exercise link to?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  You can share the exercise link with as many people as you
                  like, as often as you need. There are no expiration limits on
                  the links.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  6. Can your service be used on mobile devices?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  Yes, our service is fully compatible with mobile devices,
                  allowing you to generate and customize exercises on the go.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton p={'24px 16px'}>
                <Text
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={'xl'}
                  fontWeight={'bold'}
                >
                  7. What should I do if I encounter technical issues with
                  platform?
                </Text>
                <AddIcon
                  boxSize={'20px'}
                  color={'primary.base'}
                  transform={`rotate(${isExpanded ? '45deg' : '0'})`}
                  transition={'transform 0.2s ease-in'}
                />
              </AccordionButton>
              <AccordionPanel p={'12px 16px 24px'}>
                <Text>
                  You can reach out to our{' '}
                  <Link href={'#'} color={'secondary.base'}>
                    Telegram Chat
                  </Link>{' '}
                  where we’ll be happy to assist you! If you experience any
                  technical issues, please reach out to us via our Telegram
                  Chat. We're here to help and ensure you have a smooth
                  experience with our platform.
                </Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

import { Input, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { shuffleArray } from '../../../features/exercise/check-exercise/lib/shuffleArray';
import { ISentence } from '../model/models';

interface ISentenceSelectInputProps {
  sentence: ISentence;
  isCheckActive: boolean;
  onValidityChange: (isValid: boolean) => void;
}

export const SentenceSelectInput = (props: ISentenceSelectInputProps) => {
  const { isCheckActive, onValidityChange } = props;
  const { sentence, answer } = props.sentence;
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const parts = sentence.split(answer);

  function handleValidity() {
    // if (value === '') {
    //   setIsValid(null);
    //   return;
    // }
    const isValid = value === answer;
    setIsValid(isValid);
    onValidityChange(isValid);
  }

  useEffect(() => {
    if (isCheckActive) {
      handleValidity();
    } else {
      setIsValid(null);
      //  setValue('');
    }
  }, [isCheckActive]);

  // useEffect(() => {
  //   if (options) {
  //     setValue(options[0]);
  //   }
  // }, [options]);

  useEffect(() => {
    if (props.sentence.options) {
      const arr = shuffleArray([...props.sentence.options]);
      setOptions(arr);
    }
  }, [props.sentence.options]);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={`fragment${index}`}>
          <Text display={'inline-block'} mr={'1ch'} key={`sentence${index}`}>
            {part}
          </Text>
          {index < parts.length - 1 && (
            <Select
              size={'sm'}
              display={'inline-block'}
              borderRadius={'40px'}
              w={'max-content'}
              m={'0 8px 0 0'}
              boxSizing={'border-box'}
              key={`input${index}`}
              onChange={(e) => setValue(e.target.value)}
              // defaultValue={options ? options[0] : ''}
              //value={value}
              isInvalid={isValid === false ? true : false}
              borderColor={isCheckActive && isValid ? 'green.500' : 'inherit'}
              boxShadow={
                isCheckActive && isValid ? '0 0 0 1px #38A169' : 'inherit'
              }
              isDisabled={isCheckActive}
              _disabled={{ opacity: 1 }}
            >
              <option value={''} key={`option-default`}></option>
              {options?.map((option, index) => (
                <option value={option} key={`option${index}`}>
                  {option}
                </option>
              ))}
            </Select>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

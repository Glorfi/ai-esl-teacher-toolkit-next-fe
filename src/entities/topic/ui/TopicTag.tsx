import { Tag, TagLabel, TagCloseButton, TagProps } from '@chakra-ui/react';
import { ITopic } from '../model/types';
import { useState } from 'react';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
interface ITopicTag extends TagProps {
  topic: ITopic;
  exerciseId: string;
  onDelete?: (args: DeleteHandlerArgs) => void;
  onFilterClick?: (arg: string) => void;
}

type DeleteHandlerArgs = {
  token: string | null;
  exerciseId: string;
  topicId: string;
};

export const TopicTag = (props: ITopicTag): JSX.Element => {
  const { topic, onDelete, exerciseId, onFilterClick } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const token = LSHandler.getJwt();

  function handleDelete() {
    if (onDelete) {
      onDelete({ token, exerciseId, topicId: topic._id });
    }
  }

  function hanldeTagClick() {
    if (onFilterClick) {
      onFilterClick(topic._id);
    }
  }

  return (
    <Tag
      colorScheme="secondary"
      variant={'outline'}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={hanldeTagClick}
      cursor={onFilterClick && "pointer"}
    >
      <TagLabel>{topic.name}</TagLabel>
      <TagCloseButton
        display={isHovered && onDelete ? 'inline-flex' : 'none'}
        onClick={handleDelete}
      />
    </Tag>
  );
};

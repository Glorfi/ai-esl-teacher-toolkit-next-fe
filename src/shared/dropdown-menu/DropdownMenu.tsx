import { ExThumbnailButton } from '@/components/ExThumbNailButton';
import {
  As,
  Icon,
  IconProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuProps,
} from '@chakra-ui/react';

interface IDropDownMenu {
  button: As | undefined;
  menuFeatures: IMenuFeatures[];
  MenuProps?: MenuProps;
}

interface IMenuFeatures extends MenuItemProps {
  feature: (arg: any) => void;
  title: string;
  icon?: any;
}

export const DropDownMenu = (props: IDropDownMenu): JSX.Element => {
  const { button, menuFeatures } = props;
  return (
    <Menu closeOnBlur closeOnSelect placement={'bottom'} {...props}>
      <MenuButton as={button}></MenuButton>
      <MenuList bgColor={'background'}>
        {menuFeatures.map(({ feature, title, icon, ...rest }) => (
          <MenuItem onClick={feature} {...rest}>
            {icon && <Icon as={icon} mr={'8px'} />}
            {title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

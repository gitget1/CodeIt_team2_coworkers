import Dropdown from '@/shared/ui/dropdown';
import { IconSetting } from '@/shared/ui/icons/IconSetting';
import { GroupRole, MenuKey, SettingMenu } from './settingMenu';

type Props = {
  role: GroupRole;
};

const MENU_ACTIONS: Record<MenuKey, () => void> = {
  EDIT: () => console.log('Edit'),
  DELETE: () => console.log('Delete'),
  LEAVE: () => console.log('Leave'),
};

export default function GroupSettingMenu({ role }: Props) {
  const menus = SettingMenu(role);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconSetting className="cursor-pointer" />
      </Dropdown.Trigger>
      <Dropdown.Menu className="min-w-[100px] overflow-hidden rounded-lg bg-white py-2">
        {menus.map((menu) => (
          <Dropdown.Item
            key={menu.key}
            onClick={MENU_ACTIONS[menu.key]}
            className="w-full cursor-pointer px-4 py-3 text-sm"
          >
            {menu.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

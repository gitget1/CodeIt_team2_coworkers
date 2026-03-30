import Dropdown from '@/shared/ui/dropdown';
import { IconSetting } from '@/shared/ui/icons/IconSetting';
import { GroupRole, SettingMenu } from './settingMenu';

type Props = {
  role: GroupRole;
};

export default function GroupSettingMenu({ role }: Props) {
  const menus = SettingMenu(role);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconSetting className="cursor-pointer" />
      </Dropdown.Trigger>
      <Dropdown.Menu className="min-w-[100px] overflow-hidden rounded-lg bg-white py-2">
        {menus.map((menu, idx) => (
          <Dropdown.Item
            key={idx}
            onClick={menu.onClick}
            className="w-full cursor-pointer px-4 py-3 text-sm"
          >
            {menu.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

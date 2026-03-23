import { IconGear } from '@/shared/ui/icons/IconGear';
import Dropdown from '@/shared/ui/dropdown';
import { StripedProgressBar } from '@/shared/ui/progress/StripedProgressBar';
import { ICON_SIZE } from '@/shared/constants/icon';
import { TeamCardDropdownMenu } from './TeamCardDropdownMenu';
import { TEAM_CARD_DROPDOWN_PANEL_CLASS, TEAM_CARD_MENU_ITEM_CLASS } from './teamCard.constants';

export type TeamCardProgressRowProps = {
  teamName: string;
  progressPercent: number;
  onEditTeam?: () => void;
  onDeleteTeam?: () => void;
};

export function TeamCardProgressRow({
  teamName,
  progressPercent,
  onEditTeam,
  onDeleteTeam,
}: TeamCardProgressRowProps) {
  return (
    <div className="mt-5 flex min-w-0 items-center gap-3">
      <StripedProgressBar
        value={progressPercent}
        className="min-w-0 flex-1"
        aria-label={`${teamName} 오늘 진행률`}
      />
      <Dropdown>
        <Dropdown.Trigger
          aria-label="팀 메뉴"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-icon-primary transition-colors hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <IconGear size={ICON_SIZE.md} />
        </Dropdown.Trigger>
        <TeamCardDropdownMenu className={TEAM_CARD_DROPDOWN_PANEL_CLASS}>
          <Dropdown.Item
            align="center"
            type="button"
            className={TEAM_CARD_MENU_ITEM_CLASS}
            onClick={() => onEditTeam?.()}
          >
            수정하기
          </Dropdown.Item>
          <Dropdown.Item
            align="center"
            type="button"
            className={TEAM_CARD_MENU_ITEM_CLASS}
            onClick={() => onDeleteTeam?.()}
          >
            삭제하기
          </Dropdown.Item>
        </TeamCardDropdownMenu>
      </Dropdown>
    </div>
  );
}

import { Button } from '@/shared/ui/Button';
import { IconCommentBtn } from '@/shared/ui/icons/IconCommentBtn';
import { Input } from '@/shared/ui/input/Input';
import { Profile } from '@/shared/ui/profile';

type Props = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  profileImageSrc?: string | null;
};

export function TaskCommentsComposer({
  draft,
  onDraftChange,
  onSubmit,
  disabled,
  profileImageSrc,
}: Props) {
  return (
    <div className="mt-3 flex items-start gap-2">
      <div className="mt-1 shrink-0">
        <Profile size="md" imageSrc={profileImageSrc ?? undefined} decorative alt="내 프로필" />
      </div>
      <div className="min-w-0 flex-1">
        <Input
          placeholder="댓글을 달아주세요"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              onSubmit();
            }
          }}
          className="text-txt-default text-md font-weight-regular border-background-tertiary rounded-none border-x-0 border-t border-b"
          rightElement={
            <Button
              type="button"
              variant="ghost"
              disabled={disabled || !draft.trim()}
              onClick={(e) => {
                e.stopPropagation();
                onSubmit();
              }}
              className="bg-primary h-6 w-6 cursor-pointer rounded-full p-0"
            >
              <IconCommentBtn className="bg-icon-primary rounded-full text-white" size={24} />
            </Button>
          }
        />
      </div>
    </div>
  );
}

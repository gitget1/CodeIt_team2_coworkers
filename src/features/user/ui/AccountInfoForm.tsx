import { FormField } from '@/shared/ui/formfield';
import { Input } from '@/shared/ui/input/Input';
import { Button } from '@/shared/ui/Button';
import { PasswordChangeModal } from './PasswordChangeModal';
import { AccountDeleteModal } from './AccountDeleteModal';
import { cn } from '@/shared/lib/cn';

export function AccountInfoForm() {
  // TODO: 저장 버튼 클릭 시 유저 정보 수정 api 연동

  return (
    <form className="flex w-full flex-col items-center">
      <div
        className={cn(
          'flex flex-col gap-6',
          'w-75', // 모바일
          'md:w-115', // 태블릿
          'xl:w-198', // PC
        )}
      >
        <FormField>
          <FormField.Label className="text-sm font-semibold">이름</FormField.Label>
          <FormField.Control>
            <Input placeholder="이름을 입력해주세요" defaultValue="강하늘" />
          </FormField.Control>
        </FormField>

        <FormField>
          <FormField.Label className="text-sm font-semibold">이메일</FormField.Label>
          <FormField.Control>
            <Input
              type="email"
              value="codeit@test.com"
              disabled
              className="bg-background-secondary border-border-primary text-txt-disabled cursor-not-allowed border"
            />
          </FormField.Control>
        </FormField>

        <FormField>
          <FormField.Label className="text-sm font-semibold">비밀번호</FormField.Label>
          <FormField.Control>
            <Input
              type="password"
              value="tesetsetsets"
              disabled
              className="bg-background-secondary border-border-primary text-txt-disabled cursor-not-allowed border"
              rightElement={<PasswordChangeModal />}
            />
          </FormField.Control>
        </FormField>

        <div className="mt-4 flex w-full items-center justify-between">
          <AccountDeleteModal />

          <Button variant="primary" size="lg" className="px-6 whitespace-nowrap">
            변경사항 저장하기
          </Button>
        </div>
      </div>
    </form>
  );
}

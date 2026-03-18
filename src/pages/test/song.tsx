import { Input } from '@/shared/ui/input/Input';
import { InputBox } from '@/shared/ui/input/InputBox';

export default function TestPage() {
  return (
    <div className="bg-background-secondary mx-auto flex max-h-full max-w-175 flex-col gap-8 p-10">
      <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Input 컴포넌트</h1>

        {/* 테스트 1: 그냥 입력창 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">1. 기본 입력창</label>
          <Input placeholder="이메일을 입력해주세요" />
        </div>

        {/* 테스트 2: 비밀번호 입력창*/}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">2. 비밀번호 입력창</label>
          <Input
            type="password"
            placeholder="비밀번호(영문, 숫자 포함, 12자 이내)를 입력해주세요."
          />
        </div>

        {/* 테스트 3: 유효성 검사 실패 (에러 상태 테두리)*/}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            3. 유효성 검사 실패 (에러 상태 테두리)
          </label>
          <Input isInvalid={true} placeholder="다시 입력해주세요" />
        </div>

        {/* 테스트 4: 비밀번호 변경 버튼*/}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            4. 비밀번호 변경 버튼
          </label>
          <Input
            type="password"
            value="1234567812345678123456781234567812345678123456781234567812345678"
            readOnly // 이미 입력된 값이라고 가정
            rightElement={
              <button
                type="button"
                className="bg-brand-primary hover:bg-interaction-hover rounded-md px-[12.5px] py-2 text-sm font-medium text-white transition-colors"
                onClick={() => alert('!!')}
              >
                변경하기
              </button>
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">InputBox (Textarea) 컴포넌트</h1>

        <div>
          <label className="text-txt-secondary mb-1 block text-sm font-medium">
            1. 할 일 모달용 (336 x 75)
          </label>
          <InputBox
            id="todo-modal"
            className="h-18.75 w-full max-w-84"
            defaultValue="내용이 길어질 경우 스크롤이 생깁니다."
          />
        </div>

        <div>
          <label className="text-txt-secondary mb-1 block text-sm font-medium">
            2. 자유게시판 본문용 (774 / 1920 반응형)
          </label>
          <InputBox
            id="board-content"
            placeholder="내용을 입력해주세요."
            className="h-50 w-full max-w-82.5 min-[774px]:h-60 min-[774px]:max-w-135 min-[1920px]:max-w-190"
          />
        </div>
      </section>
    </div>
  );
}

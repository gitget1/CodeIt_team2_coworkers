import { IconArrowDown } from '@/shared/ui/icons';
import { ToggleIconButton } from '@/shared/ui/ToggleIconButton';
import { useState } from 'react';

// 테스트용 간단한 SVG 아이콘 컴포넌트
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen space-y-12 bg-white p-10">
      {/* --- 2. 토글 아이콘 버튼 섹션 --- */}
      <section className="space-y-6">
        <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">Toggle Icon Button</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 인터랙션 테스트 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase">Interaction Test</h3>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-6">
              <span className="font-medium text-gray-700">
                상태:{' '}
                <span className={isOpen ? 'text-blue-600' : 'text-gray-400'}>
                  {isOpen ? '열림 (Expanded)' : '닫힘 (Collapsed)'}
                </span>
              </span>
              <ToggleIconButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>

          {/* 고정 상태 테스트 (Disabled 등) */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase">States</h3>
            <div className="flex items-center gap-8 rounded-lg bg-gray-50 p-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">Default</span>
                <ToggleIconButton isOpen={false} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">Expanded</span>
                <ToggleIconButton isOpen={true} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">Disabled</span>
                <ToggleIconButton isOpen={false} disabled />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">Custom Color</span>
                <ToggleIconButton isOpen={false} className="text-brand-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* 실제 활용 예시 (미리보기) */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase">
            Usage Example (Accordion Style)
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4">
              <div className="flex items-center gap-2">
                <IconArrowDown size={18} className="text-gray-400" />
                <span className="font-semibold text-gray-800">팀 선택</span>
              </div>
              <ToggleIconButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
            {isOpen && (
              <div className="animate-in fade-in slide-in-from-top-1 space-y-2 bg-gray-50 p-4 text-sm text-gray-600">
                <p className="cursor-pointer rounded p-2 hover:bg-white">경영관리팀</p>
                <p className="cursor-pointer rounded p-2 hover:bg-white">프로덕트팀</p>
                <p className="cursor-pointer rounded p-2 hover:bg-white">마케팅팀</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

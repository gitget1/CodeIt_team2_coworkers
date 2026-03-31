import Image from 'next/image';
import emptyImage from '@/shared/assets/images/empty-my-history.png';

export const HistoryEmptyState = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center pt-32 pb-60">
      <div className="relative mb-3 aspect-square w-80">
        <Image
          src={emptyImage}
          alt="완료된 할 일이 없습니다."
          fill
          priority // 우선 로딩
          unoptimized={true} // 압축 안함 화질 유지
          className="object-contain"
        />
      </div>

      <p className="text-interaction-inactive mb-2 text-center text-lg font-medium">
        아직 완료된 작업이 없어요.
      </p>
      <p className="text-interaction-inactive text-center text-base font-medium">
        하나씩 완료해가며 히스토리를 만들어보세요!
      </p>
    </div>
  );
};

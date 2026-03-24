import { ArticleCard } from '@/features/boards/components/ArticleCard';
import ArticleDropDown from '@/features/boards/components/ArticleDropDown';
import { toArticle } from '@/features/boards/model/mapper/article.mapper';
import { IconArrowDown } from '@/shared/ui/icons';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconPencil } from '@/shared/ui/icons/IconPencil';
import { IconSearch } from '@/shared/ui/icons/IconSearch';
import { useEffect, useState } from 'react';

const mockData = {
  totalCount: 10,
  list: [
    {
      id: 1,
      title: '커피 머신 고장 신고합니다 ☕',
      content: '오늘 아침부터 커피가 안 내려옵니다. 확인 부탁드려요.',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
      createdAt: '2026-03-19T08:00:00.000Z',
      updatedAt: '2026-03-19T08:00:00.000Z',
      commentCount: 3,
      likeCount: 21,
      writer: {
        id: 1,
        nickname: '민성',
      },
    },
    {
      id: 2,
      title: '회의실 예약이 안됩니다 📅',
      content: '3층 회의실 예약 시스템 오류 확인 부탁드립니다.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      createdAt: '2026-03-18T09:10:00.000Z',
      updatedAt: '2026-03-18T09:10:00.000Z',
      commentCount: 5,
      likeCount: 14,
      writer: {
        id: 2,
        nickname: '지훈',
      },
    },
    {
      id: 3,
      title: '사무실 너무 추워요 ❄️',
      content: '에어컨 온도 조절 부탁드립니다.',
      image: 'https://images.unsplash.com/photo-1581090700227-4c4b6c2a9c9b',
      createdAt: '2026-03-17T07:30:00.000Z',
      updatedAt: '2026-03-17T07:30:00.000Z',
      commentCount: 2,
      likeCount: 33,
      writer: {
        id: 3,
        nickname: '수진',
      },
    },
    {
      id: 4,
      title: '신규 장비 입고 완료 💻',
      content: '개발팀 장비 세팅 진행 중입니다.',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
      createdAt: '2026-03-16T06:20:00.000Z',
      updatedAt: '2026-03-16T06:20:00.000Z',
      commentCount: 1,
      likeCount: 19,
      writer: {
        id: 4,
        nickname: '현우',
      },
    },
    {
      id: 5,
      title: '사내 이asdaasdasddddddddddddddddddddddddddddddd벤트 공지 🎉',
      content:
        '금요일 저녁 이벤트 참여 부탁드립니다dddddddssssssssssddddddddddddddddddddddddddddddddddddddddddddddddddd!',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      createdAt: '2026-03-15T05:00:00.000Z',
      updatedAt: '2026-03-15T05:00:00.000Z',
      commentCount: 8,
      likeCount: 52,
      writer: {
        id: 5,
        nickname: '유진',
      },
    },
    {
      id: 6,
      title: '프린터 작동 안됨 🖨️',
      content: '출력 시 계속 오류가 발생합니다.',
      image: 'https://images.unsplash.com/photo-1581091215367-59ab6b4b6c4b',
      createdAt: '2026-03-14T04:40:00.000Z',
      updatedAt: '2026-03-14T04:40:00.000Z',
      commentCount: 0,
      likeCount: 7,
      writer: {
        id: 1,
        nickname: '민성',
      },
    },
    {
      id: 7,
      title: '점심 뭐 먹죠? 🍱',
      content: '근처 맛집 추천 부탁드립니다.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      createdAt: '2026-03-13T03:10:00.000Z',
      updatedAt: '2026-03-13T03:10:00.000Z',
      commentCount: 6,
      likeCount: 40,
      writer: {
        id: 2,
        nickname: '지훈',
      },
    },
    {
      id: 8,
      title: '회의실 청소 필요 🧹',
      content: '회의실 상태가 좋지 않습니다.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
      createdAt: '2026-03-12T02:00:00.000Z',
      updatedAt: '2026-03-12T02:00:00.000Z',
      commentCount: 1,
      likeCount: 11,
      writer: {
        id: 3,
        nickname: '수진',
      },
    },
    {
      id: 9,
      title: '인터넷 너무 느려요 🌐',
      content: '네트워크 점검 부탁드립니다.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      createdAt: '2026-03-11T01:30:00.000Z',
      updatedAt: '2026-03-11T01:30:00.000Z',
      commentCount: 4,
      likeCount: 28,
      writer: {
        id: 4,
        nickname: '현우',
      },
    },
    {
      id: 10,
      title: '출퇴근 시간 변경 안내 🚗',
      content: '다음 달부터 출퇴근 시간이 조정됩니다.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      createdAt: '2026-03-10T00:00:00.000Z',
      updatedAt: '2026-03-10T00:00:00.000Z',
      commentCount: 2,
      likeCount: 17,
      writer: {
        id: 5,
        nickname: '유진',
      },
    },
  ],
};
export default function BoardsListPage() {
  const mappedList = mockData.list.map(toArticle);
  const [sortOption, setSortOption] = useState('최신순');
  const [current, setCurrent] = useState(0);
  const total = 5;
  const handleUpCurrent = () => {
    if (current >= 4) return;
    else {
      setCurrent(current + 1);
    }
  };
  const handleDownCurrent = () => {
    if (current <= 0) return;
    else {
      setCurrent(current - 1);
    }
  };
  const getBestCount = () => {
    if (typeof window === 'undefined') return 1;

    if (window.matchMedia('(min-width: 1024px)').matches) return 3; // lg
    if (window.matchMedia('(min-width: 768px)').matches) return 2; // md
    return 1; // mobile
  };
  const [bestCount, setBestCount] = useState(1);
  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
  useEffect(() => {
    const handleResize = debounce(() => {
      setBestCount(getBestCount());
    }, 50);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedList = mappedList?.slice().sort((a, b) => b.likeCount - a.likeCount);

  const visibleBest = sortedList.slice(current * bestCount, current * bestCount + bestCount);
  return (
    <main className="mx-auto mt-22 max-w-[1120px] px-2 md:px-4 lg:px-0">
      <header className="md:flex md:h-14 md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">자유게시판</h1>

        <label className="mt-3 flex h-12 w-full items-center rounded-full border-2 border-blue-500 md:mt-0 md:h-14 md:w-105">
          <IconSearch size={32} className="ml-3 text-blue-400" />
          <input
            placeholder="검색어를 입력해주세요"
            className="ml-3 w-full text-base outline-none"
          />
        </label>
      </header>

      <section className="mt-8 h-92.5 rounded-xl border border-slate-100 bg-slate-100 px-2 pt-10">
        <div className="mx-auto w-fit">
          <h2 className="text-xl font-bold">베스트 게시글</h2>

          <div className="flex gap-4 pt-6">
            {visibleBest.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} variant="best" />
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 items-center">
            <div />

            <div className="flex justify-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    current === i ? 'w-4 bg-slate-400' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 pr-6">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
                onClick={handleDownCurrent}
              >
                <IconArrowLeft size={16} />
              </button>

              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white"
                onClick={handleUpCurrent}
              >
                <IconArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-11 flex justify-center">
        <div className="flex w-full max-w-[1074px] justify-between">
          <ArticleDropDown value={sortOption} onChange={setSortOption} />

          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500 bg-blue-500">
            <IconPencil size={24} className="text-white" />
          </button>
        </div>
      </section>

      <section className="mt-5 mb-8 flex justify-center">
        <div className="grid w-full max-w-[1074px] grid-cols-1 gap-3 lg:grid-cols-2">
          {mappedList.map((article) => (
            <div key={article.id}>
              <ArticleCard article={article} variant="default" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

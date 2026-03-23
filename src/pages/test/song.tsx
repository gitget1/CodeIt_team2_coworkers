import { useState } from 'react';
import { useCreateGroupMutation, useGroupQuery } from '@/features/group';

export default function GroupFlowTestPage() {
  const [createdId, setCreatedId] = useState<number>(0);

  // 그룹 생성 훅
  // isPending  요청이 진행중 인지 로딩중인지
  const { mutate: createGroup, isPending: isCreating } = useCreateGroupMutation();

  const { data: groupDetail, isLoading: isFetching } = useGroupQuery(createdId);

  const startTest = () => {
    createGroup(
      { body: { name: `테스트 그룹 ${Date.now()}` } },
      {
        onSuccess: (newGroup) => {
          setCreatedId(newGroup.id);
          alert(`테스트 완료 생성된 그룹 ID: ${newGroup.id}`);
        },
        onError: (err) => {
          console.error('테스트 실패:', err);
          alert('에러 발생 콘솔창을 확인해주세요.');
        },
      },
    );
  };

  const loading = isCreating || isFetching;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>그룹 기능 통합 테스트</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={startTest}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            border: 'none',
            borderRadius: '8px',
            margin: '40px 0',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '처리 중...' : '그룹 생성하고 바로 조회하기'}
        </button>
      </div>

      {createdId !== 0 && (
        <div
          style={{
            background: '#f8f9fa',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
          }}
        >
          <h3 style={{ marginTop: 0 }}>!!!! 결과 확인 !!!!</h3>
          <div style={{ marginBottom: '8px' }}>
            <strong>생성된 ID: </strong> {createdId}
          </div>

          {groupDetail && (
            <>
              <div style={{ marginBottom: '8px' }}>
                <strong>서버에서 가져온 이름:</strong> {groupDetail.name}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>생성 시각:</strong> {groupDetail.createdAt.toLocaleString()}
              </div>

              <div style={{ cursor: 'pointer' }}>
                <div style={{ color: '#0070f3', fontWeight: '500' }}>상세 JSON 데이터 보기</div>
                <pre
                  style={{
                    marginTop: '12px',
                    padding: '15px',
                    background: '#222',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                >
                  {JSON.stringify(groupDetail, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

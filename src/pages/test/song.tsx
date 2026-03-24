import { useState } from 'react';
import { useUpdateGroupMutation } from '@/features/group/hooks/useUpdateGroupMutation';
import { useDeleteGroupMutation } from '@/features/group/hooks/useDeleteGroupMutation';
import { useRemoveGroupMemberMutation } from '@/features/group/hooks/useRemoveMemberMutation';
import { useInvitationTokenQuery } from '@/features/group/hooks/useInvitationTokenQuery';
import { useGroupTasksQuery } from '@/features/group/hooks/useGroupTasksQuery';

export default function GroupTestPage() {
  const TEST_GROUP_ID = 3946;

  const { mutate: updateGroup } = useUpdateGroupMutation();
  const { mutate: deleteGroup } = useDeleteGroupMutation();
  const { mutate: removeMember } = useRemoveGroupMemberMutation();

  const { data: tasks, isLoading: isTasksLoading } = useGroupTasksQuery(TEST_GROUP_ID);
  const { data: token, refetch: fetchToken } = useInvitationTokenQuery(TEST_GROUP_ID, false);

  const [newName, setNewName] = useState('');
  const [targetUserId, setTargetUserId] = useState('');

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '8px',
  };

  const dangerButtonStyle = {
    ...buttonStyle,
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>그룹 테스트 페이지</h1>
      <p>
        현재 그룹 ID: <strong>{TEST_GROUP_ID}</strong>
      </p>
      <hr style={{ marginBottom: '20px' }} />

      <section style={{ marginBottom: '20px' }}>
        <h3>그룹 이름 변경</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="바꿀 이름 입력"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          style={buttonStyle}
          onClick={() => updateGroup({ groupId: TEST_GROUP_ID, body: { name: newName } })}
        >
          수정 API
        </button>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3>멤버 강퇴</h3>
        <input
          style={inputStyle}
          type="number"
          placeholder="강퇴할 유저 ID"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        />
        <button
          style={dangerButtonStyle}
          onClick={() =>
            removeMember({ groupId: TEST_GROUP_ID, memberUserId: Number(targetUserId) })
          }
        >
          강퇴 API
        </button>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3>초대 토큰 생성</h3>
        <button style={buttonStyle} onClick={() => fetchToken()}>
          토큰 받아오기
        </button>
        {token && (
          <div style={{ marginTop: '10px' }}>
            <strong>발급된 토큰:</strong>
            <p
              style={{
                color: '#2563eb',
                wordBreak: 'break-all',
                backgroundColor: '#f1f5f9',
                padding: '12px',
                borderRadius: '6px',
              }}
            >
              {token}
            </p>
          </div>
        )}
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3>그룹 완전 삭제</h3>
        <button
          style={dangerButtonStyle}
          onClick={() => {
            if (window.confirm('진짜 삭제!!!??')) {
              deleteGroup({ groupId: TEST_GROUP_ID }, { onSuccess: () => alert('삭제 성공') });
            }
          }}
        >
          삭제 API
        </button>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3>5. 이 그룹의 할 일 목록</h3>
        {isTasksLoading ? (
          <p>로딩 중...</p>
        ) : (
          <ul style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
            {tasks?.length === 0 ? <li>등록된 할 일이 없습니다.</li> : null}
            {tasks?.map((task) => (
              <li key={task.id} style={{ marginBottom: '8px' }}>
                {task.title || '이름 없음'} {task.isCompleted ? 'v' : 'x'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

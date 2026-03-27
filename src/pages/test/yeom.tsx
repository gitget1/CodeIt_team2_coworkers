import { useArticleDetailQuery } from '@/features/boards/hooks/useArticleDetailQuery';
import { useCommentList } from '@/features/boards/hooks/useCommentList';
import { useCreateComment } from '@/features/boards/hooks/useCreateComment';
import { useDeleteArticle } from '@/features/boards/hooks/useDeleteArticleMutation';
import { useDeleteComment } from '@/features/boards/hooks/useDeleteComment';
import { useToggleLikeArticle } from '@/features/boards/hooks/useToggleLikeArticle';
import { useUpdateComment } from '@/features/boards/hooks/useUpdateComment';
import { useState } from 'react';

export default function TestPage() {
  const articleId = 2460; // 테스트용
  const [content, setContent] = useState('');

  // ✅ 게시글
  const { data: article, refetch: refetchArticle } = useArticleDetailQuery(articleId);
  const { deleteArticle } = useDeleteArticle();
  const { toggleLike } = useToggleLikeArticle();

  // ✅ 댓글 (useInfiniteQuery)
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommentList(articleId);

  const comments = commentsData?.pages.flatMap(page => page.list) ?? [];

  const { createComment } = useCreateComment();
  const { updateComment } = useUpdateComment(articleId);
  const { deleteComment } = useDeleteComment(articleId);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 API 통합 테스트</h1>

      {/* ================= 게시글 ================= */}
      <h2>📄 게시글 상세</h2>

      <button onClick={() => refetchArticle()}>게시글 새로고침</button>

      {article && (
        <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>

          <div>
            👍 {article.likeCount} / 💬 {article.commentCount}
          </div>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => toggleLike(articleId, article.isLiked)}>👍 좋아요 토글</button>

            <button onClick={() => deleteArticle(articleId)} style={{ marginLeft: 10 }}>
              🗑 게시글 삭제
            </button>
          </div>
        </div>
      )}

      <hr />

      {/* ================= 댓글 ================= */}
      <h2>💬 댓글</h2>

      {/* 작성 */}
      <div>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글 입력"
        />
        <button
          onClick={() => {
            createComment(articleId, content);
            setContent('');
          }}
        >
          작성
        </button>
      </div>

      {/* 리스트 */}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} style={{ marginBottom: 10 }}>
            <b>{comment.writer.nickname}</b>
            <div>{comment.content}</div>

            <button onClick={() => updateComment(comment.id, comment.content + ' (수정됨)')}>
              수정
            </button>

            <button onClick={() => deleteComment(comment.id)} style={{ marginLeft: 5 }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      {/* 무한 로딩 버튼 */}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '불러오는 중...' : '더보기'}
        </button>
      )}
    </div>
  );
}
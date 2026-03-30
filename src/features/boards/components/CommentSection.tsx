import { IconUser } from '@/shared/ui/icons';
import { IconCommentBtn } from '@/shared/ui/icons/IconCommentBtn';
import { Input } from '@/shared/ui/input/Input';
import KebabMenu from '@/features/boards/components/KebabMenu';
import { Article } from '../model/entities/article.model';
import { Comment } from '../model/entities/comment.model';
import { useUserQuery } from '@/features/user';
import { formatDate } from '@/shared/lib/date';
import { useCommentSection } from '../hooks/useCommentSection';

interface Props {
  article: Article;
  comments: Comment[];
}

export default function CommentSection({ article, comments }: Props) {
  const { data: currentUser } = useUserQuery();

  const {
    commentInput,
    setCommentInput,
    updateInputs,
    editCommentIds,
    isCreating,
    handleCreateComment,
    handleInputChange,
    toggleEdit,
    deleteComment,
    updateComment,
  } = useCommentSection(article.id);

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="mb-2 flex gap-1 font-semibold">
          댓글 <span className="text-brand-primary">{article.commentCount}</span>
        </h2>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <IconUser size={32} className="rounded-[6px] bg-slate-200 text-white" />

        <Input
          placeholder="댓글을 달아주세요"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isCreating) {
              handleCreateComment();
            }
          }}
          className="rounded-none border-0 border-y !border-slate-200 shadow-none"
          rightElement={
            <button onClick={handleCreateComment} disabled={isCreating || !commentInput.trim()}>
              <IconCommentBtn
                size={24}
                className={`bg-icon-primary rounded-full text-white ${
                  isCreating ? 'opacity-50' : ''
                }`}
              />
            </button>
          }
        />
      </div>

      <div className="mt-8 space-y-4">
        {comments.map((c) => {
          const isEditing = editCommentIds.has(c.id);
          const isOwner = currentUser?.id === c.writer.id;

          return (
            <div key={c.id} className="flex items-center gap-3">
              <IconUser size={32} className="rounded-[6px] bg-slate-200 text-white" />

              <div className="flex-1">
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="mb-1 text-sm font-bold">{c.writer.nickname}</div>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          className="text-md font-bold text-blue-500"
                          onClick={() => {
                            updateComment(c.id, updateInputs[c.id]);
                            toggleEdit(c.id);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="text-md font-bold text-gray-500"
                          onClick={() => toggleEdit(c.id)}
                        >
                          취소
                        </button>
                      </div>
                    ) : isOwner ? (
                      <KebabMenu
                        onEdit={() => toggleEdit(c.id, c.content)}
                        onDelete={() => deleteComment(c.id)}
                      />
                    ) : (
                      <div className="invisible h-5 w-5" />
                    )}
                  </div>

                  {isEditing ? (
                    <Input
                      value={updateInputs[c.id]}
                      onChange={(e) => handleInputChange(c.id, e.target.value)}
                    />
                  ) : (
                    <div className="text-sm">{c.content}</div>
                  )}

                  <div className="mt-1 text-sm text-slate-400">{formatDate(c.createdAt)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { IconUser } from '@/shared/ui/icons';
import { IconCommentBtn } from '@/shared/ui/icons/IconCommentBtn';
import { IconHeartEmpty } from '@/shared/ui/icons/IconHeartEmpty';
import { Input } from '@/shared/ui/input/Input';
import KebabMenu from '@/features/boards/components/KebabMenu';
import { Article } from '../model/entities/article.model';
import { Comment } from '../model/entities/comment.model';
import { useUserQuery } from '@/features/user';
import { formatDate } from '@/shared/lib/date';

interface Props {
  article: Article;
  comments: Comment[];
}

export default function CommentSection({ article, comments }: Props) {
  const { data: currentUser } = useUserQuery();
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="mb-2 flex gap-1 font-semibold">
          댓글 <span className="text-brand-primary">{article.commentCount}</span>
        </h2>

        <div className="flex items-center gap-1">
          <IconHeartEmpty />
          <div>{article.likeCount}</div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <IconUser size={32} className="rounded-[6px] bg-slate-200 text-white" />
        <Input
          placeholder="댓글을 달아주세요"
          className="border-0 border-y !border-slate-200 shadow-none"
          rightElement={
            <button>
              <IconCommentBtn size={24} className="bg-icon-primary rounded-full text-white" />
            </button>
          }
        />
      </div>

      <div className="mt-8 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <IconUser size={32} className="rounded-[6px] bg-slate-200 text-white" />

            <div className="flex-1">
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <div className="text-sm font-bold">{c.writer.nickname}</div>
                  {currentUser?.id === c.writer.id && (
                    <KebabMenu
                      onEdit={() => console.log('댓글 수정', c.id)}
                      onDelete={() => console.log('댓글 삭제', c.id)}
                    />
                  )}
                </div>

                <div className="text-sm">{c.content}</div>

                <div className="mt-1 text-sm text-slate-400">{formatDate(c.createdAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

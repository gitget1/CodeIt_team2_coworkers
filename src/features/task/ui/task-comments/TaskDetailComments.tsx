import { useCallback, useState } from 'react';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import type { Task } from '../../model/entities/task.model';
import type { TaskComment } from '../../model/entities/taskComment.model';
import type { TaskCommonParams } from '../../model/params/task.params';
import { useCreateTaskCommentMutation } from '../../hooks/useCreateTaskCommentMutation';
import { useDeleteTaskCommentMutation } from '../../hooks/useDeleteTaskCommentMutation';
import { useTaskCommentsQuery } from '../../hooks/useTaskCommentsQuery';
import { useUpdateTaskCommentMutation } from '../../hooks/useUpdateTaskCommentMutation';
import { TaskCommentsComposer } from './TaskCommentsComposer';
import { TaskCommentRow } from './TaskCommentRow';
import { TaskCommentsListSkeleton } from './TaskCommentsListSkeleton';

type Props = {
  task: Task;
  params: TaskCommonParams;
  listDateIso?: string;
  onTaskChange?: (task: Task) => void;
};

export function TaskDetailComments({ task, params, listDateIso, onTaskChange }: Props) {
  const { data: me } = useUserQuery();
  const taskId = task.id;

  const { data: comments = [], isLoading } = useTaskCommentsQuery(taskId, {
    enabled: Boolean(taskId),
  });

  const createMutation = useCreateTaskCommentMutation({
    taskId,
    groupId: params.groupId,
    taskListId: params.taskListId,
    listDateIso,
  });

  const updateMutation = useUpdateTaskCommentMutation({
    taskId,
    groupId: params.groupId,
    taskListId: params.taskListId,
    listDateIso,
  });

  const deleteMutation = useDeleteTaskCommentMutation({
    taskId,
    groupId: params.groupId,
    taskListId: params.taskListId,
    listDateIso,
  });

  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');

  const handleCreate = useCallback(() => {
    const text = draft.trim();
    if (!text || createMutation.isPending) return;
    createMutation.mutate(text, {
      onSuccess: () => {
        setDraft('');
        onTaskChange?.({ ...task, commentCount: task.commentCount + 1 });
      },
    });
  }, [createMutation, draft, onTaskChange, task]);

  const startEdit = (c: TaskComment) => {
    setEditingId(c.id);
    setEditDraft(c.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft('');
  };

  const saveEdit = () => {
    if (editingId == null || !editDraft.trim()) return;
    updateMutation.mutate(
      { commentId: editingId, content: editDraft },
      {
        onSuccess: () => {
          cancelEdit();
        },
      },
    );
  };

  const remove = (commentId: number) => {
    deleteMutation.mutate(commentId, {
      onSuccess: () => {
        onTaskChange?.({ ...task, commentCount: Math.max(0, task.commentCount - 1) });
      },
    });
  };

  const isBusy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="mt-8 md:mt-14">
      <div className="flex items-center gap-1">
        <p className="text-2lg text-txt-primary font-bold">댓글</p>
        <p className="text-2lg text-brand-primary font-bold">{task.commentCount}</p>
      </div>

      <TaskCommentsComposer
        draft={draft}
        onDraftChange={setDraft}
        onSubmit={handleCreate}
        disabled={isBusy}
        profileImageSrc={me?.profileImage}
      />

      <div className="mt-6">
        {isLoading ? (
          <TaskCommentsListSkeleton />
        ) : (
          comments.map((c) => {
            const authorId = c.userId ?? c.user.id;
            const isOwner = me != null && authorId === me.id;
            return (
              <TaskCommentRow
                key={c.id}
                comment={c}
                isOwner={isOwner}
                isEditing={editingId === c.id}
                editDraft={editDraft}
                onEditDraftChange={setEditDraft}
                onStartEdit={() => startEdit(c)}
                onCancelEdit={cancelEdit}
                onSaveEdit={saveEdit}
                onDelete={() => remove(c.id)}
                isMutating={isBusy}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

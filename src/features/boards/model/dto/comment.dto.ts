export type CommentDto = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
};

export type CommentListDto = {
  nextCursor: number | null;
  list: CommentDto[];
};

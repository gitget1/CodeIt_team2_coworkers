export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ArticleList {
  totalCount: number;
  list: Article[];
}

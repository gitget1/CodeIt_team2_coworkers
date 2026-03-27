export interface ArticleDto {
  updatedAt: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

export interface ArticleListDto {
  totalCount: number;
  list: ArticleDto[];
}

export type ArticleDetailDto = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

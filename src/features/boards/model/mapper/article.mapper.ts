import { ArticleDto, ArticleListDto } from '../dto/article.dto';
import { Article, ArticleList } from '../entities/article.model';

export function toArticle(dto: ArticleDto): Article {
  return {
    ...dto,
    image: dto.image?.trim() || undefined,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export function toArticleList(dto: ArticleListDto): ArticleList {
  return {
    totalCount: dto.totalCount,
    list: dto.list.map(toArticle),
  };
}

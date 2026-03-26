import { ArticleCard } from '@/features/boards/components/ArticleCard';
import { Article } from '@/features/boards/model/entities/article.model';

type ArticleListProps = {
  articles: Article[];
};

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="grid w-full max-w-[1074px] grid-cols-1 gap-3 lg:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="default" />
      ))}
    </div>
  );
}

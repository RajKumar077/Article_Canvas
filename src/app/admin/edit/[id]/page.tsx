import { updateArticle } from "@/actions/articles";
import { getArticleById } from "@/lib/data";
import { notFound } from "next/navigation";
import { ArticleForm } from "../../article-form";

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const updateArticleWithId = updateArticle.bind(null, article.id);

  return <ArticleForm article={article} action={updateArticleWithId} />;
}

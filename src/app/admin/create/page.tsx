import { createArticle } from "@/actions/articles";
import { ArticleForm } from "../article-form";

export default function CreateArticlePage() {
  return <ArticleForm action={createArticle} />;
}

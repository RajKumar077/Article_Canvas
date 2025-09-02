import { getArticleById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <article className="container max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-muted-foreground text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <Badge variant="secondary">{article.readTimeMinutes} min read</Badge>
          </div>
        </div>
      </header>

      {article.images && article.images.length > 0 && (
        <div className="mb-8">
          <Carousel className="w-full rounded-lg overflow-hidden">
            <CarouselContent>
              {article.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                    <Image
                      src={img}
                      alt={`${article.title} image ${index + 1}`}
                      data-ai-hint="article image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      )}

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

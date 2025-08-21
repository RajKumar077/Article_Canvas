import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getArticles } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">
          Welcome to Content Canvas
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a collection of articles, stories, and ideas.
        </p>
      </header>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`} className="group block">
              <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg mb-4">
                     <Image
                      src={article.posterImage}
                      alt={article.title}
                      fill
                      data-ai-hint="poster image"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary">{article.title}</CardTitle>
                  <CardDescription className="pt-2">{article.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
                  <Badge variant="secondary">{article.readTimeMinutes} min read</Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="font-headline text-2xl mb-2">No Articles Yet</h2>
            <p className="text-muted-foreground">Check back later for new content!</p>
        </div>
      )}
    </div>
  );
}

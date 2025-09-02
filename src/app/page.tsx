
"use client";

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
import { useEffect, useState, useMemo } from "react";
import type { Article } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setIsLoading(true);
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
      setIsLoading(false);
    }
    loadArticles();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchInputValue);
  };

  const clearSelection = () => {
    setSelectedTags([]);
  };

  const filteredArticles = useMemo(() => {
    let articlesToShow = articles;

    // Filter by search term first
    if (searchTerm) {
      articlesToShow = articlesToShow.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Then filter by tags
    if (selectedTags.length > 0) {
      articlesToShow = articlesToShow.filter((article) =>
        article.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    return articlesToShow;
  }, [articles, selectedTags, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">
          Welcome to Content Canvas
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a collection of articles, stories, and ideas.
        </p>
      </header>

      <div className="mb-8 max-w-md mx-auto">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="w-full pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      <div className="mb-12">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="font-semibold mr-2">Filter by tag:</span>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                onClick={() => handleTagClick(tag)}
                className="cursor-pointer transition-all"
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Button onClick={clearSelection} variant="ghost" size="sm" className="h-auto py-0.5 px-2">
                 <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
      </div>

      {isLoading ? (
         <div className="text-center py-20">
            <h2 className="font-headline text-2xl mb-2">Loading Articles...</h2>
         </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
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
                <CardContent className="flex-grow">
                   {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline">...</Badge>
                      )}
                    </div>
                  )}
                </CardContent>
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
            <h2 className="font-headline text-2xl mb-2">No Articles Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or selected tags.</p>
        </div>
      )}
    </div>
  );
}


"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Article } from "@/lib/types";

interface ArticleFormProps {
  article?: Article | null;
  action: (formData: FormData) => Promise<void>;
}

export function ArticleForm({ article, action }: ArticleFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(article?.title || "");
  const [shortDescription, setShortDescription] = useState(article?.shortDescription || "");
  const [content, setContent] = useState(article?.content || "");

  const maxTitleLength = 100;
  const maxShortDescriptionLength = 100;
  const maxContentLength = 500;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            {article ? "Edit Article" : "Create New Article"}
          </CardTitle>
          <CardDescription>Fill in the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={maxTitleLength}
              />
              <p className="text-sm text-muted-foreground text-right">
                {title.length} / {maxTitleLength}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                maxLength={maxShortDescriptionLength}
              />
               <p className="text-sm text-muted-foreground text-right">
                {shortDescription.length} / {maxShortDescriptionLength}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                maxLength={maxContentLength}
              />
               <p className="text-sm text-muted-foreground text-right">
                {content.length} / {maxContentLength}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="posterImage">Poster Image URL</Label>
              <Input
                id="posterImage"
                name="posterImage"
                type="url"
                defaultValue={article?.posterImage}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Slideshow Image URLs</Label>
              <Textarea
                id="images"
                name="images"
                defaultValue={article?.images.join("\n")}
                placeholder="One URL per line"
                rows={5}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">
                {article ? "Update Article" : "Create Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

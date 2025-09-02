
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Article } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ArticleFormProps {
  article?: Article | null;
  action: (formData: FormData) => Promise<void>;
}

const availableTags = [
  "Technology",
  "Health & Wellness",
  "Travel",
  "Food & Recipes",
  "Education & Learning",
  "Business & Finance",
  "Entertainment",
  "Science & Nature",
  "Lifestyle & Personal Growth",
  "News & Current Events",
];

export function ArticleForm({ article, action }: ArticleFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(article?.title || "");
  const [shortDescription, setShortDescription] = useState(article?.shortDescription || "");
  const [content, setContent] = useState(article?.content || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(article?.tags || []);

  const maxTitleLength = 100;
  const maxShortDescriptionLength = 100;
  const maxContentLength = 500;
  const maxTags = 10;

  const handleTagSelect = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < maxTags) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

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
             <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Select onValueChange={handleTagSelect} disabled={selectedTags.length >= maxTags}>
                <SelectTrigger>
                  <SelectValue placeholder="Select up to 10 tags" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag} disabled={selectedTags.includes(tag)}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground text-right">
                {selectedTags.length} / {maxTags}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                   <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                     {tag}
                     <button type="button" onClick={() => handleTagRemove(tag)} className="rounded-full hover:bg-muted-foreground/20">
                       <X className="h-3 w-3" />
                       <span className="sr-only">Remove {tag}</span>
                     </button>
                   </Badge>
                ))}
              </div>
              {/* Hidden inputs to send tags with the form */}
              {selectedTags.map(tag => (
                <input type="hidden" key={tag} name="tags" value={tag} />
              ))}
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

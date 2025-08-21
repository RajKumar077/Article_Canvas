import Link from "next/link";
import { format } from "date-fns";
import { getArticles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { deleteArticle } from "@/actions/articles";
import { logout } from "@/actions/auth";
import { PlusCircle, Edit, Trash2, LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl">Admin Dashboard</CardTitle>
              <CardDescription>Manage your articles here.</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
                <Button asChild>
                  <Link href="/admin/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Article
                  </Link>
                </Button>
                <form action={logout}>
                    <Button variant="outline" type="submit">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Read Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        {format(new Date(article.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{article.readTimeMinutes} min</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin/edit/${article.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <form action={deleteArticle.bind(null, article.id)}>
                            <Button variant="ghost" size="icon" type="submit">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No articles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

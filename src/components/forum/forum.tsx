import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ForumDescription } from "@/components/ui/forum-description";
import { forumController } from "../../controller/forum-controller";

interface Thread {
  id: string;
  author: string;
  title: string;
  description: string;
  avatarUrl?: string;
}

const Forum = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadDescription, setNewThreadDescription] = useState("");

  const { handleForum, handlePostForum } = forumController();

  const fetchThreads = async () => {
    const forumData = await handleForum();

    const mappedThreads: Thread[] = forumData.map((thread: any) => ({
      id: thread.id,
      author: thread.authorId,
      title: thread.title,
      description: thread.posts.length > 0 ? thread.posts[0].content : "No description yet.",
      avatarUrl: "https://i.pravatar.cc/40",
    }));

    setThreads(mappedThreads);
  };

  const handleAddThread = async () => {
    if (!newThreadTitle.trim()) return;
  
    try {
      await handlePostForum({
        title: newThreadTitle,
        content: newThreadDescription || "New thread created by user.",
      });
  
      setNewThreadTitle("");
      setNewThreadDescription("");
    } catch (error) {
      console.error("Erro ao adicionar thread:", error);
    }
  };
  

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <Input 
          placeholder="Add a new thread title..." 
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
        />

        {newThreadTitle.trim() && (
          <ForumDescription
            placeholder="Add a description for your thread..."
            value={newThreadDescription}
            onChange={(e) => setNewThreadDescription(e.target.value)}
          />
        )}

        <Button onClick={handleAddThread}>Post</Button>
      </div>

      <div className="space-y-6">
        {threads.map((thread) => (
          <Card key={thread.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                {thread.avatarUrl ? (
                  <AvatarImage src={thread.avatarUrl} alt={thread.author} />
                ) : (
                  <AvatarFallback>{thread.author[0]}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <CardTitle>{thread.title}</CardTitle>
                <CardDescription>by {thread.author}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{thread.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Add Response</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;

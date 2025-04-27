import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ForumDescription } from "@/components/ui/forum-description";
import { forumController } from "../../controller/forum-controller";

interface Comment {
  commentId: string;
  authorId: string;
  content: string;
  createdAt?: string;
}

interface Post {
  postId: string;
  content: string;
  authorId: string;
  comments: Comment[];
}

interface Thread {
  id: string;
  author: string;
  title: string;
  description: string;
  avatarUrl?: string;
  posts: Post[];
}

const Forum = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadDescription, setNewThreadDescription] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [showCommentDropdown, setShowCommentDropdown] = useState(false);

  const { handleForum, handlePostForum, handleAddComment } = forumController();

  const fetchThreads = async () => {
    const forumData = await handleForum();

    const mappedThreads: Thread[] = forumData.map((thread: any) => ({
      id: thread.id,
      author: thread.authorId,
      title: thread.title,
      description: thread.posts.length > 0 ? thread.posts[0].content : "No description yet.",
      avatarUrl: "https://i.pravatar.cc/40",
      posts: thread.posts.map((post: any) => ({
        postId: post.postId,
        content: post.content,
        authorId: post.authorId,
        comments: post.comments || []
      }))
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
      await fetchThreads(); 
    } catch (error) {
      console.error("Erro ao adicionar thread:", error);
    }
  };

  const handleShowCommentDropdown = (topicId: string, postId: string) => {
    setActiveTopicId(topicId);
    setActivePostId(postId);
    setShowCommentDropdown(true);
  };

  const handleAddCommentClick = async () => {
    if (!commentContent.trim() || !activeTopicId || !activePostId) return;

    try {
      await handleAddComment(
        activeTopicId,
        commentContent,
        activePostId
      );
      setShowCommentDropdown(false);
      setCommentContent("");
      await fetchThreads();
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
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
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{thread.description}</p>
              
              {thread.posts[0].comments.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Responses:</h4>
                  <div className="space-y-2">
                    {thread.posts[0].comments.map((comment) => (
                      <div key={comment.commentId} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.authorId[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{comment.authorId}</p>
                            {comment.createdAt && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (thread.posts.length > 0) {
                    handleShowCommentDropdown(thread.id, thread.posts[0].postId);
                  }
                }}
                disabled={thread.posts.length === 0}
              >
                Add Response
              </Button>

              {showCommentDropdown && activeTopicId === thread.id && (
                <div className="mt-4 space-y-2 ml-4">
                  <textarea
                    className="w-full p-2 border rounded"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write your comment here..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddCommentClick}>Post Comment</Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowCommentDropdown(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;
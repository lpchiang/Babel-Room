const API_URL = 'http://3.142.243.38:5000/api/forum';

export function forumController() {
  const handleForum = async () => {
    const url = `${API_URL}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      const data = await response.json();
      console.log(data); 
      return data; 
    } catch (error) {
      console.error('Erro ao buscar fórum:', error);
      return []; 
    }
  }

  const handlePostForum = async (data: { title: string; content: string; }) => {
    const url = `${API_URL}`;
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    const uniqueName = payload.unique_name;
  
    console.log('Unique Name:', uniqueName);
  
    const forumPayload = {
      id: crypto.randomUUID(),
      title: data.title,
      authorId: uniqueName,
      posts: [
        {
          postId: crypto.randomUUID(),
          authorId: uniqueName,
          content: data.content,
          comments: [],
          votes: [],
        }
      ],
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(forumPayload),
      });
  
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('Erro ao postar no fórum:', error);
      return [];
    }
  }
  const handleAddComment = async (topicId: string, commentContent: string, postId: string) => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    const uniqueName = payload.unique_name;
  
    const url = `${API_URL}/${topicId}/posts/${postId}/comments`; 
  
    const newComment = {
      commentId: crypto.randomUUID(),
      authorId: uniqueName,
      content: commentContent,
    };
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao adicionar comentário");
      }
  
      const data = await response.json();
      console.log("Comentário adicionado:", data);
      return data;
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };
  
  return { handleForum, handlePostForum, handleAddComment };
}

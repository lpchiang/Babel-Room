// src/controller/lesson-controller.ts
const API_URL = 'http://3.142.243.38:5000/api/Question';

export function lessonController() {
  const handleLesson = async (questionId: string) => {
    const url = `${API_URL}/${questionId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        ...data,
        id: questionId
      };
    } catch (error) {
      console.error('Erro ao buscar questão:', error);
      throw error;
    }
  }

  return { handleLesson };
}
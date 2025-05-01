import { useState } from "react";

const API_URL = 'http://3:142:243:38:5000/api/users/login';

export function logInController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogIn = async (data: { email: string; password: string; }) => {
    setLoading(true);
    setError(null);

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erro ao fazer login");
      }

      const result = await response.json();
      const accessToken = result.accessToken;
      localStorage.setItem('authToken', accessToken); 

      return { success: true, message: "Login realizado com sucesso!" };

    } catch (err: any) {
      setError(err.message);
      console.error("❌ Erro no login:", err.message);
      return { success: false, message: err.message || "Erro desconhecido" };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogIn,
  };
}

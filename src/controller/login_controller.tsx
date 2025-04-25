import { useState } from "react";

const API_URL = 'http://localhost:5092/api/users/login';

export function logInController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogIn = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    console.log("Enviando para API:", requestBody);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response)
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erro ao registrar");
      }

      const result = await response.json();
      console.log("Login com sucesso:", result);

    } catch (err: any) {
      setError(err.message);
      console.error("❌ Erro no registro:", err.message);
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

import { useState } from "react";

const API_URL = 'http://3:142:243:38:5000/api/users/signUp';

export function useSignUpController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: {
    email: string;
    name: string;
    username: string,
    birthDate: Date;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    const requestBody = {
      email: data.email,
      username: data.username,
      fullName: data.name,
      birthDate: data.birthDate.toISOString(),
      password: data.password,
      passwordHash: data.confirmPassword,
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
        throw new Error(err.message || "Erro ao registrar");
      }

      const result = await response.json();
      return { success: true, data: result }; 

    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message }; 
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSignUp,
  };
}
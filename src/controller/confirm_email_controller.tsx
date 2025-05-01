import { useState } from "react";

const API_URL = 'http://3:142:243:38:5000/api/users';

export function confirmEmailController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmEmail = async (data: {
    email: string;
    code: string; 
  }) => {
    setLoading(true);
    setError(null);

    const urlWithParams = `${API_URL}/confirm-email?email=${encodeURIComponent(data.email)}&code=${encodeURIComponent(data.code)}`;

    try {
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error confirming email");
      }

      console.log("Email confirmed successfully");

      return "Email confirmed successfully";

    } catch (err: any) {
      setError(err.message);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmEmail = async (data: {
    email: string;
  }) => {
    setLoading(true);
    setError(null);

    const urlWithParams = `${API_URL}/resend-email?email=${encodeURIComponent(data.email)}`;

    try {
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error resending confirmation email");
      }

      return "Confirmation email resent successfully";

    } catch (err: any) {
      setError(err.message);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleConfirmEmail,
    handleResendConfirmEmail,
  };
}

import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import CardWrapper from "../card-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { confirmEmailController } from "../../controller/confirm_email_controller"; 

const ConfirmEmailForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  const { handleConfirmEmail, handleResendConfirmEmail } = confirmEmailController(); 

  const onSubmit = async () => {
    setIsLoading(true); 
    setError(""); 
    setSuccess(""); 
    setResendMessage(""); 
  
    try {
      await handleConfirmEmail({ email: email || '', code: verificationCode });
      setSuccess("Verification code confirmed successfully!"); 
    } catch (err) {
      setError("Error verifying the code.");
      console.error("Error on submit:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  const onResendEmail = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

      try {
          await handleResendConfirmEmail({ email: email });
          setResendMessage("Email Resended");

      } catch (err) {
          setError("Error resending the verification email.");
          console.error("Error on resend:", err);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <CardWrapper
      title="Email Verification"
      label="Verify Email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="space-y-4">
        {!success && (
          <>
            <div className="flex flex-col space-y-2">
              <label htmlFor="verification-code" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="verification-code"
                placeholder="Enter the code received by email."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={onSubmit}
              disabled={isLoading || !verificationCode}
              className="w-full"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <Button
              variant="outline"
              onClick={onResendEmail}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Resending..." : "Resend Verification Email"}
            </Button>
          </>
        )}

              {resendMessage && ( 
                  <div className="text-center text-blue-500">
                      {resendMessage}
                  </div>
              )}
        {success && (
          <div className="text-center text-green-600">
            {success}
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            {error}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default ConfirmEmailForm;

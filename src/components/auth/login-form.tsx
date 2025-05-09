import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import LoginUserSchema from "@/components/auth/schemas/login-user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { logInController } from "../../controller/login_controller";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const { handleLogIn } = logInController();

  const onSubmit = async (data: z.infer<typeof LoginUserSchema>) => {
    setLoading(true);
    try {
      const result = await handleLogIn(data);
  
      if (result?.success) {
        navigate("docs");
      } else {
        console.error("Login falhou:", result?.message || "Erro desconhecido.");
      }
    } catch (err) {
      console.error("Erro ao submeter:", err);
    } finally {
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper
      title="Login to your account"
      label="Login"
      backButtonHref="auth/signup"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={pending}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm;
"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-contex";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const { login, loginLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login(email, password);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Faça login para acessar seu painel!</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2"
            id="login-form"
            onSubmit={handleLogin}
          >
            <Input placeholder="joao@example.com" type="email" name="email" />
            <Input placeholder="******" type="password" name="password" />
          </form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="default" form="login-form" disabled={loginLoading}>
              Entrar
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Button variant="outline" disabled={googleLoading}>
        <FcGoogle /> Entrar com Google
      </Button>
    </>
  );
}

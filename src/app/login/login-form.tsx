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
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const { login, loginLoading, googleLogin, googleLoading } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <Button variant="default" form="login-form" loading={loginLoading}>
              Entrar
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Button variant="outline" disabled={googleLoading} onClick={googleLogin}>
        <FcGoogle /> Entrar com Google
      </Button>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm text-slate-400">Ainda não possui uma conta?</p>
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={() => router.push("/register")}
        >
          Registrar
        </Button>
      </div>

      <div className="-mt-2 flex items-center gap-2">
        <p className="text-sm text-slate-400">Esqueceu a senha?</p>
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={() => router.push("/recover-password")}
        >
          Recuperar
        </Button>
      </div>
    </>
  );
}

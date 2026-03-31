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
import { sucessToast, errorToast } from "@/lib/toast";
import { auth } from "@/firebase/firebase-config";
import { useAuth } from "@/context/auth-contex";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import { BsGoogle, BsGithub } from "react-icons/bs";

export default function RegisterForm() {
  const [registerLoading, setRegisterLoading] = useState(false);

  const router = useRouter();
  const { googleLogin, googleLoading, githubLogin, githubLoading } = useAuth();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!username || !email || !password || !confirmPassword) {
      errorToast("Por favor, preencha todos os campos");
      setRegisterLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      errorToast("As senhas não coincidem");
      setRegisterLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      sucessToast("Conta criada com sucesso!");

      router.push("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro ao registrar: ${errorCode} - ${errorMessage}`);

      switch (errorCode) {
        case "auth/email-already-in-use":
          errorToast("Este e-mail já está em uso");
          break;
        case "auth/invalid-email":
          errorToast("O e-mail fornecido é inválido");
          break;
        case "auth/password-does-not-meet-requirements":
          errorToast("A senha deve ter no mínimo 6 caracteres");
          break;
        default:
          errorToast(`Erro ao cadastrar: ${errorMessage}`);
          break;
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registre-se</CardTitle>
          <CardDescription>
            Crie uma conta para começar a utilizar o TaskFlow!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleRegister}
            id="register-form"
          >
            <Input
              placeholder="João da Silva"
              type="text"
              name="username"
              disabled={registerLoading || googleLoading || githubLoading}
            />
            <Input
              placeholder="joao@example.com"
              type="email"
              name="email"
              disabled={registerLoading || googleLoading || githubLoading}
            />
            <Input
              placeholder="******"
              type="password"
              name="password"
              disabled={registerLoading || googleLoading || githubLoading}
            />
            <Input
              placeholder="******"
              type="password"
              name="confirm-password"
              disabled={registerLoading || googleLoading || githubLoading}
            />
          </form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button
              variant="default"
              type="submit"
              form="register-form"
              loading={registerLoading}
              disabled={registerLoading || googleLoading || githubLoading}
            >
              {registerLoading ? "Carregando..." : "Registrar"}
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={googleLogin}
          disabled={googleLoading}
          className="h-8 w-8 rounded-full"
        >
          <BsGoogle />
        </Button>

        <Button
          variant="outline"
          onClick={githubLogin}
          disabled={githubLoading}
          className="h-8 w-8 rounded-full"
        >
          <BsGithub />
        </Button>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm text-slate-400">Já possui uma conta? </p>
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={() => router.push("/login")}
        >
          Entrar
        </Button>
      </div>
    </>
  );
}

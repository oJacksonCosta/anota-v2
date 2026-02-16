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
import { auth, provider } from "@/firebase/firebase-config";
import mapFirebaseUser from "@/lib/map-firebase-user";

import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

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

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = mapFirebaseUser(userCredential.user);

      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro ao registrar: ${errorCode} - ${errorMessage}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registre-se</CardTitle>
          <CardDescription>
            Crie uma conta para começar a utilizar o Anota!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleRegister}
            id="register-form"
          >
            <Input placeholder="João da Silva" type="text" name="username" />
            <Input placeholder="joao@example.com" type="email" name="email" />
            <Input placeholder="******" type="password" name="password" />
            <Input
              placeholder="******"
              type="password"
              name="confirm-password"
            />
          </form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button
              variant="default"
              type="submit"
              form="register-form"
              disabled={registerLoading}
              loading={registerLoading}
            >
              {registerLoading ? "Carregando..." : "Registrar"}
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Button
        variant="outline"
        onClick={handleGoogleRegister}
        disabled={googleLoading}
      >
        <FcGoogle /> Entrar com Google
      </Button>

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

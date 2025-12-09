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
import { User } from "@/types";

import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm() {
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username: string = formData.get("username") as string;
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const confirmPassword: string = formData.get("confirmPassword") as string;

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      window.alert("Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("As senhas não são iguais");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password as string)
      .then((userCredential) => {
        const user = userCredential.user;
        window.alert(`Usuário ${user} registrado com sucesso!`);
        redirect("/login", RedirectType.push);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Erro ao registrar: ${errorCode} - ${errorMessage}`);
      });
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
            <Input placeholder="********" type="password" name="password" />
            <Input placeholder="********" type="password" name="password" />
          </form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="default" type="submit" form="register-form">
              Registrar
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <div className="flex items-center">
        <p className="text-sm text-slate-400">Já possui uma conta? </p>
        <Button
          variant="link"
          onClick={() => redirect("/login", RedirectType.push)}
        >
          Entrar
        </Button>
      </div>
    </>
  );
}

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";

export default function RecoverForm() {
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email de recuperação enviado!");
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert("Erro ao enviar email de recuperação. Tente novamente.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>
          Digite seu email para recuperar sua senha
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action="post">
          <Input placeholder="Email" name="email" />
        </form>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button type="submit">Recuperar senha</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

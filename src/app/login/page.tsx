import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Anota | Login",
};

export default function Login() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Faça login para acessar seu painel!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Input placeholder="Digite seu email" />
            <Input placeholder="Digite sua senha" />
          </div>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="default">Entrar</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </section>
  );
}

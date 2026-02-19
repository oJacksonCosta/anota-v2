import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RecoverForm() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>
          Digite seu email para recuperar sua senha
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Input placeholder="Email" />
      </CardContent>
      <CardAction>
        <Button>Recuperar senha</Button>
      </CardAction>
    </Card>
  );
}

import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Anota | Registro",
};

export default function Register() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <RegisterForm />
    </section>
  );
}

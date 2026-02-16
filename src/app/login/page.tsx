import { Metadata } from "next";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Anota | Login",
};

export default function Login() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4">
      <LoginForm />
    </section>
  );
}

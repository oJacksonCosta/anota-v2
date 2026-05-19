"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <header className="flex h-[4.5rem] w-full items-center justify-between gap-4 border-b-1 border-slate-200 px-8">
        <Image src="/logo.svg" width={150} height={150} alt="Logotipo" />
        <Button
          variant={"outline"}
          onClick={() => {
            redirect("/login", RedirectType.push);
          }}
        >
          Entrar
        </Button>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl">
          Bem-vindo ao{" "}
          <span className="text-default font-black">TaskFlow!</span>
        </h1>

        <p className="w-9/10 text-center lg:w-7/10">
          Anote suas ideias, organize suas tarefas, defina prazos e mantenha sua
          rotina em ordem, elevando sua eficiência e alcançando resultados com
          mais clareza.
        </p>

        <Button
          variant={"default"}
          className="bg-default hover:bg-default-hover w-fit"
          onClick={() => {
            redirect("/register", RedirectType.push);
          }}
        >
          Comece a utilizar
          <FaArrowCircleRight />
        </Button>
      </section>
    </main>
  );
}

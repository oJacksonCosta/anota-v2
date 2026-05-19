import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow | Dashboard",
};

export default function Dashboard() {
  return (
    <header className="flex justify-between bg-gray-800 p-6 dark:bg-gray-600">
      <h1 className="text-3xl font-bold">TaskFlow</h1>
      <div className="aspect-square w-12 rounded-full bg-amber-500"></div>
    </header>
  );
}

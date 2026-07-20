"use client"

import { Layout } from "@/components/Layout";


export default function Home() {
 
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
        <header className="h-16 flex items-center px-6 border-b bg-white dark:bg-zinc-900">
        <h1 className="text-xl font-semibold">
          PDF AI Form Extractor
        </h1>
      </header>
        <main className="flex-1 p-4 overflow-hidden">
          <Layout />
        </main>
    </div>
  );
}

import React from 'react'
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
});
import { DynamicForm } from './DynamicForm'

export const Layout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-4">
    <section className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <PdfViewer />
    </section>
    <section  className="rounded-xl border bg-white shadow-sm overflow-y-auto p-6">
        <DynamicForm />
    </section>
    </div>
  )
}

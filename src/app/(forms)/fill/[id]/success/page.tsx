import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Form Submitted | Monoform",
};

export default function Page({}: Props) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-screen-sm rounded-md border-1 border-zinc-200 bg-zinc-50 p-4 sm:p-8">
        <h1 className="text-2xl font-semibold">Form submitted</h1>
        <p>Thank you for submitting the form.</p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
    >
      <ArrowLeft size={18} />
      Volver a la lista
    </button>
  );
}

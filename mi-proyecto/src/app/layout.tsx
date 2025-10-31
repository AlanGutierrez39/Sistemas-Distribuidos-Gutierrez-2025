"use client";

import "./globals.css";
import React from "react";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Creamos el cliente global de React Query
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <QueryClientProvider client={queryClient}>
          {/* NAVBAR */}
          <header className="bg-red-500 text-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-4 py-3">
              <h1 className="text-xl font-bold">Pokédex App</h1>
              <div className="flex gap-4">
                <Link href="/" className="hover:underline">
                  🏠 Lista
                </Link>
                <Link href="/favorites" className="hover:underline">
                  ❤️ Favoritos
                </Link>
              </div>
            </nav>
          </header>

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

          {/* FOOTER */}
          <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500 border-t">
            © {new Date().getFullYear()} Pokédex App — Hecho con ❤️ y Next.js
          </footer>

          {/* DevTools opcional */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

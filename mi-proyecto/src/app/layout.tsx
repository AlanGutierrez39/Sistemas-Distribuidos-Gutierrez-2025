import React from "react";
import Link from "next/link";
import QueryProvider from "../components/QueryProvider";
import "./globals.css";

export const metadata = {
  title: 'Pokedex - Lista de Pokémon',
  description: 'Listado y detalle de Pokémon usando PokeAPI'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header style={{ padding: 16, borderBottom: '1px solid #eaeaea', marginBottom: 16 }}>
          <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/" style={{ fontWeight: '700', textDecoration: 'none' }}>
              Lista de Pokemons
            </Link>
          </nav>
        </header>

        <QueryProvider>
          <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 16px' }}>{children}</main>
        </QueryProvider>

        <footer
          style={{
            marginTop: 40,
            padding: 20,
            borderTop: '1px solid #eaeaea',
            textAlign: 'center',
            color: '#666'
          }}
        >
          © 2025 PokeNext. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
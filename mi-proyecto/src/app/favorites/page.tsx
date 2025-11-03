"use client";

import React from "react";
import { useFavorites, useRemoveFavorite } from "../hooks/useFavorites";
import PokemonCard from "../PokemonCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();
  const removeMutation = useRemoveFavorite();

  if (isLoading) return <p>Cargando favoritos...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">❤️ Tus Pokémons Favoritos</h1>
      {!favorites ? (
        <p>Cargando favoritos...</p>
        ) : favorites.length === 0 ? (
        <p>No tenés favoritos aún.</p>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((f: any) => (
            <div key={f.id} className="p-4 border rounded-lg flex flex-col items-center">
              <Link
                href={`/pokemon/${f.id}`}
                className="block border rounded-lg shadow hover:bg-gray-100 p-3 text-center transition"
              >
                <h2 className="text-lg font-semibold capitalize">{f.id}</h2>
              </Link>
              <button
                onClick={() => removeMutation.mutate(f.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
      {/* 💡 Botón también al final, centrado (opcional) */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          <ArrowLeft size={18} />
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}

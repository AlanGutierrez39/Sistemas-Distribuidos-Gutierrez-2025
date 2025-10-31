"use client";

import React from "react";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "./hooks/useFavorites";

interface Props {
  name: string;
}

export default function PokemonCard({ name }: Props) {
  const { data: favorites } = useFavorites();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  const isFavorite = favorites?.some((f: any) => f.id === name);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) await removeMutation.mutateAsync(name);
      else await addMutation.mutateAsync(name);
    } catch (err) {
      alert("Error actualizando favoritos");
    }
  };

  return (
    <div className="p-4 border rounded-lg flex flex-col items-center shadow-sm">
      <p className="capitalize font-medium">{name}</p>
      <button
        onClick={toggleFavorite}
        disabled={addMutation.isPending || removeMutation.isPending}
        className={`mt-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
          isFavorite
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {isFavorite ? "❤️ Quitar" : "🤍 Favorito"}
      </button>
    </div>
  );
}

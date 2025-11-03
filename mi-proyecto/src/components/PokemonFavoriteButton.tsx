"use client";

import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";

export default function PokemonFavoriteButton({ name }: { name: string }) {
  const { data: favorites } = useFavorites();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  const isFavorite = favorites?.some((f: any) => f.id === name);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeMutation.mutateAsync(name);
      } else {
        await addMutation.mutateAsync({
          id: name,
          addedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      alert("Error actualizando favoritos");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={addMutation.isPending || removeMutation.isPending}
      className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
    </button>
  );
}

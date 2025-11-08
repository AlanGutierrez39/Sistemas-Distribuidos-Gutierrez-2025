"use client";

import React, { useState } from "react";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import AddFavoriteModal from "../components/AddFavoriteModal";

export default function PokemonFavoriteButton({ name }: { name: string }) {
  const { data: favorites } = useFavorites();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFavorite = favorites?.some((f: any) => f.id === name);

  const handleAddFavorite = async (values: { customName: string; description: string }) => {
    try {
      await addMutation.mutateAsync({
        id: name,
        addedAt: new Date().toISOString(),
        customName: values.customName,
        description: values.description,
      });
      setIsModalOpen(false);
    } catch (err) {
      alert("Error agregando favorito");
    }
  };

  const toggleFavorite = async () => {
    try {
      console.log("Click favorito", { isFavorite, isModalOpen });
      if (isFavorite) {
        await removeMutation.mutateAsync(name);
      } else {
        console.log("Abriendo modal...");
        setIsModalOpen(true); // 🔥 abre el modal correctamente
        console.log("Estado modal:", isModalOpen);
      }
    } catch (err) {
      alert("Error actualizando favoritos");
    }
  };

  return (
    <div>
      <button
        onClick={toggleFavorite}
        disabled={addMutation.isPending || removeMutation.isPending}
        className={`mt-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 
            backdrop-blur-md border shadow-lg 
            ${
              isFavorite
                ? "bg-red-500/30 border-red-300/40 text-white hover:bg-red-500/40"
                : "bg-white/10 border-white/20 text-gray-900 hover:bg-white/20"
            }`}
      >
        {isFavorite ? "❤️ Quitar" : "🤍 Favorito"}
      </button>

      <AddFavoriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFavorite}
      />
    </div>
  );
}

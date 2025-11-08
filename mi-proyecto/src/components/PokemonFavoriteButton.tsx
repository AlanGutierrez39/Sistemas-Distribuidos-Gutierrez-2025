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
        style={{
          position: 'relative',
          padding: '12px 24px',
          borderRadius: '16px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: isFavorite 
            ? '1px solid rgba(239, 68, 68, 0.4)' 
            : '1px solid rgba(255, 255, 255, 0.25)',
          background: isFavorite
            ? 'rgba(239, 68, 68, 0.3)'
            : 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          color: 'white',
          boxShadow: isFavorite
            ? '0 4px 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          e.currentTarget.style.boxShadow = isFavorite
            ? '0 8px 30px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            : '0 8px 30px rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.background = isFavorite
            ? 'rgba(239, 68, 68, 0.4)'
            : 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = isFavorite
            ? '0 4px 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.background = isFavorite
            ? 'rgba(239, 68, 68, 0.3)'
            : 'rgba(255, 255, 255, 0.12)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
        }}
      >
        {/* Efecto de brillo interno */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          pointerEvents: 'none',
        }} />
        
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '20px' }}>
            {isFavorite ? "❤️" : "🤍"}
          </span>
          {isFavorite ? "Quitar" : "Favorito"}
        </span>
      </button>

      <AddFavoriteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultName={name}
        onSave={(data) => {
          // Aquí haces lo que quieras (guardar en localStorage o POST)
          console.log('Favorito guardado', data);
          addMutation.mutate({
            id: name,
            addedAt: new Date().toISOString(),
            customName: data.name,
            description: data.note || '',
          });
        }}      
      />
    </div>
  );
}

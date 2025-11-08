"use client";

import React from "react";
import Link from "next/link";
import PokemonFavoriteButton from "./PokemonFavoriteButton";

interface Props {
  name: string;
  id: string;
}

export default function PokemonCard({ name, id }: Props) {
  return (
    <div 
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
      }}
    >
      {/* Efecto de brillo superior */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
        }}
      />

      <Link
        href={`/pokemon/${name}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {/* Imagen del Pokémon */}
        <div
          style={{
            width: '100%',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={name}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            }}
            onError={(e) => {
              // Fallback a sprites normales si no hay artwork
              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            }}
          />
        </div>

        {/* Nombre del Pokémon */}
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            textTransform: 'capitalize',
            color: 'white',
            margin: '0 0 12px 0',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          {name}
        </h2>
      </Link>

      {/* Botón de favorito */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PokemonFavoriteButton name={name} />
      </div>
    </div>
  );
}
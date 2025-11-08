"use client";

import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import PokemonFavoriteButton from "../../components/PokemonFavoriteButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '32px 48px',
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          <div style={{ marginBottom: '12px', fontSize: '32px' }}>⏳</div>
          Cargando favoritos...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 
        style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #fff, #e0e0e0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '36px' }}>❤️</span>
        Tus Pokémons Favoritos
      </h1>

      {!favorites || favorites.length === 0 ? (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '20px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
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

          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💔</div>
          <p
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '8px',
            }}
          >
            No tenés favoritos aún
          </p>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
            }}
          >
            Explorá la Pokédex y agregá tus Pokémon favoritos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((f: any) => (
            <div
              key={f.id}
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                href={`/pokemon/${f.id}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
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
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${f.id}.png`}
                    alt={f.customName || f.id}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${f.id}.png`;
                    }}
                  />
                </div>

                {/* Nombre personalizado o ID */}
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    color: 'white',
                    margin: '0 0 4px 0',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                  }}
                >
                  {f.customName || f.id}
                </h2>

                {/* Descripción si existe */}
                {f.description && (
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textAlign: 'center',
                      margin: '0 0 12px 0',
                      lineHeight: '1.4',
                      maxHeight: '40px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {f.description}
                  </p>
                )}
              </Link>

              {/* Reutilizamos PokemonFavoriteButton - automáticamente mostrará "Quitar" porque isFavorite=true */}
              <div 
                onClick={(e) => e.stopPropagation()}
                style={{ alignItems: 'center' }}
              >
                <PokemonFavoriteButton name={f.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón de volver */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
          }}
        >
          {/* Efecto de brillo interno */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              pointerEvents: 'none',
            }}
          />
          <ArrowLeft size={20} />
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}
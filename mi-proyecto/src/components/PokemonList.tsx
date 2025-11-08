// ============================================
// PokemonList.tsx
// ============================================
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "./PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Pokemon {
  name: string;
  url: string;
}

async function fetchPokemons(limit: number): Promise<Pokemon[]> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
  return res.data.results;
}

// Función helper para extraer el ID de la URL
function getPokemonId(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

export default function PokemonList() {
  const [limit, setLimit] = useState<number>(30);

  const {
    data = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Pokemon[]>({
    queryKey: ["pokemons", limit],
    queryFn: () => fetchPokemons(limit),
    staleTime: 1000 * 60 * 2,
  });

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
        }}
      >
        Pokédex (React Query)
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '16px',
                height: '240px',
              }}
            >
              <Skeleton 
                height={240} 
                baseColor="rgba(255, 255, 255, 0.1)"
                highlightColor="rgba(255, 255, 255, 0.2)"
              />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '12px',
            padding: '16px',
            color: '#ff6b6b',
            textAlign: 'center',
          }}
        >
          Error: {(error as Error).message}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.map((pokemon) => {
              const pokemonId = getPokemonId(pokemon.url);
              return (
                <PokemonCard 
                  key={pokemon.name} 
                  name={pokemon.name}
                  id={pokemonId}
                />
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setLimit((prev) => prev + 30)}
              disabled={isFetching}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isFetching ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                background: isFetching 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
                opacity: isFetching ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseDown={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
                }
              }}
              onMouseUp={(e) => {
                if (!isFetching) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                }
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
              
              {isFetching ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Cargando...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '18px' }}>⚡</span>
                  Cargar más
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

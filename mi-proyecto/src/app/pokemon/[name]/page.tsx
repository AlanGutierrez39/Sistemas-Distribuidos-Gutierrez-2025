"use client";

import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PokemonFavoriteButton from "@/components/PokemonFavoriteButton";
import { useEffect, useState, use } from "react";

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
  types: { type: { name: string } }[];
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Unwrap params usando React.use()
  const { name } = use(params);
  
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [name]);

  if (loading) {
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
          Cargando Pokémon...
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
        <p>No se pudo cargar el Pokémon</p>
      </div>
    );
  }

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  // Colores según tipo de Pokémon
  const typeColors: Record<string, string> = {
    normal: 'rgba(168, 167, 122, 0.3)',
    fire: 'rgba(238, 129, 48, 0.3)',
    water: 'rgba(99, 144, 240, 0.3)',
    electric: 'rgba(247, 208, 44, 0.3)',
    grass: 'rgba(122, 199, 76, 0.3)',
    ice: 'rgba(150, 217, 214, 0.3)',
    fighting: 'rgba(194, 46, 40, 0.3)',
    poison: 'rgba(163, 62, 161, 0.3)',
    ground: 'rgba(226, 191, 101, 0.3)',
    flying: 'rgba(169, 143, 243, 0.3)',
    psychic: 'rgba(249, 85, 135, 0.3)',
    bug: 'rgba(166, 185, 26, 0.3)',
    rock: 'rgba(182, 161, 54, 0.3)',
    ghost: 'rgba(115, 87, 151, 0.3)',
    dragon: 'rgba(111, 53, 252, 0.3)',
    dark: 'rgba(112, 87, 70, 0.3)',
    steel: 'rgba(183, 183, 206, 0.3)',
    fairy: 'rgba(214, 133, 173, 0.3)',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Card principal con liquid glass */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '24px',
          padding: '40px',
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

        {/* Nombre del Pokémon */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: '700',
            textTransform: 'capitalize',
            textAlign: 'center',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
          }}
        >
          {pokemon.name}
        </h1>

        {/* Imagen del Pokémon */}
        {image && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '32px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <img
              src={image}
              alt={pokemon.name}
              style={{
                width: '240px',
                height: '240px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            />
          </div>
        )}

        {/* Grid de información */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {/* Altura */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📏</div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              Altura
            </p>
            <p
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
                margin: 0,
              }}
            >
              {pokemon.height / 10} m
            </p>
          </div>

          {/* Peso */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚖️</div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              Peso
            </p>
            <p
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
                margin: 0,
              }}
            >
              {pokemon.weight / 10} kg
            </p>
          </div>
        </div>

        {/* Tipos */}
        <div
          style={{
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
            }}
          >
            Tipos
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  display: 'inline-block',
                  background: typeColors[t.type.name] || 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '8px 20px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Botón de favorito */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <div style={{ alignItems: 'center' }}>
            <PokemonFavoriteButton name={pokemon.name} />
          </div>
        </div>
      </div>

      {/* Botón de volver */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
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
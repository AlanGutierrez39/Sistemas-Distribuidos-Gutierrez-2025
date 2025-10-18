"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface PokemonDetail {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export default function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p>Cargando detalles...</p>;
  if (!pokemon) return <p>Pokémon no encontrado 😢</p>;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto mb-4"
      />
      <p className="text-lg">
        <strong>Tipos:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <Link
        href="/"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        🔙 Volver a la lista
      </Link>
    </div>
  );
}

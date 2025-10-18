"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0")
      .then((res) => setPokemons(res.data.results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pokédex inicial</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={100} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      )}
    </div>
  );
}

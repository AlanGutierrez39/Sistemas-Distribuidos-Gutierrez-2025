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
      <h1 className="text-2xl font-bold mb-4">Pokédex (React Query)</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={100} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setLimit((prev) => prev + 30)}
              disabled={isFetching}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full shadow-md font-medium text-white transition-all ${
                isFetching
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isFetching ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                "Cargar más"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

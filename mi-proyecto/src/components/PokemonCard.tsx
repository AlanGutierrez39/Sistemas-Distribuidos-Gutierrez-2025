"use client";

import React from "react";
import Link from "next/link";
import PokemonFavoriteButton from "./PokemonFavoriteButton";

interface Props {
  name: string;
}

export default function PokemonCard({ name }: Props) {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-center shadow-sm">
      <Link
        href={`/pokemon/${name}`}
        className="block border rounded-lg shadow hover:bg-gray-100 p-3 text-center transition"
      >
        <h2 className="text-lg font-semibold capitalize">{name}</h2>
      </Link>

      {/* 🧩 Solo dejamos el botón con toda la lógica interna */}
      <PokemonFavoriteButton name={name} />
    </div>
  );
}

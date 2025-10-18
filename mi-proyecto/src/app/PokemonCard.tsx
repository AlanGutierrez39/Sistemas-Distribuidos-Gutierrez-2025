"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Props {
  name: string;
  url: string;
}

export default function PokemonCard({ name }: Props) {
  const [count, setCount] = useState(0);

  return (
    <Link
      href={`/pokemon/${name}`}
      onClick={() => setCount(count + 1)}
      className="block border rounded-lg shadow hover:bg-gray-100 p-3 text-center transition"
    >
      <h2 className="text-lg font-semibold capitalize">{name}</h2>
      <p className="text-sm text-gray-600">Clics: {count}</p>
    </Link>
  );
}

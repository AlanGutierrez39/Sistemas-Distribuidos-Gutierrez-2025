import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import PokemonFavoriteButton from "@/components/PokemonFavoriteButton";

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

export default async function PokemonDetailPage(props: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await props.params;

  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon: PokemonDetail = res.data;

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="p-6">
      {/* 🔙 Botón visual de volver */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          <ArrowLeft size={18} />
          Volver a la lista
        </Link>
      </div>

      {/* 🧩 Detalle del Pokémon */}
      <div className="max-w-md mx-auto text-center bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-4xl font-bold capitalize mb-4 text-gray-800">
          {pokemon.name}
        </h1>

        {image && (
          <img
            src={image}
            alt={pokemon.name}
            className="mx-auto w-48 h-48 transition-transform hover:scale-105"
          />
        )}

        <div className="mt-4 text-gray-700">
          <p className="text-lg">
            <strong>Altura:</strong> {pokemon.height / 10} m
          </p>
          <p className="text-lg">
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>

          <div className="mt-4">
            <span className="font-semibold text-gray-800">Tipos:</span>{" "}
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="inline-block bg-blue-100 text-blue-800 font-medium rounded-full px-3 py-1 mx-1 text-sm"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* ⭐ Botón de favorito (Client Component) */}
        <div className="mt-6">
          <PokemonFavoriteButton name={pokemon.name} />
        </div>
      {/* 💡 Botón también al final, centrado (opcional) */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          <ArrowLeft size={18} />
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}

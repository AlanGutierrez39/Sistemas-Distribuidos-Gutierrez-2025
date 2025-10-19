import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingPokemonDetail() {
  return (
    <div className="text-center">
      <Skeleton circle={true} height={100} width={100} className="mx-auto mb-4" />
      <Skeleton height={30} width={200} className="mx-auto mb-2" />
      <Skeleton height={20} width={150} className="mx-auto mb-4" />
      <p className="text-gray-500 mt-4">Cargando detalles del Pokémon...</p> 
    </div>
  );
}

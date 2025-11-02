import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

export async function GET() {
  try {
    const favorites = await Database.read();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("❌ Error leyendo favoritos:", error);
    return NextResponse.json(
      { error: "Error leyendo favoritos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newFavorite = await req.json();

    if (!newFavorite?.id) {
      return NextResponse.json(
        { error: "Falta el campo 'id'" },
        { status: 400 }
      );
    }

    const favorites = await Database.read();

    // Evitar duplicados
    if (favorites.some((f: any) => f.id === newFavorite.id)) {
      return NextResponse.json(
        { error: "El Pokémon ya está en favoritos" },
        { status: 409 }
      );
    }

    // Agregar
    const favToAdd = {
      id: newFavorite.id,
      addedAt: new Date().toISOString(),
    };

    await Database.add(favToAdd);

    return NextResponse.json(favToAdd, { status: 201 });
  } catch (error) {
    console.error("❌ Error agregando favorito:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

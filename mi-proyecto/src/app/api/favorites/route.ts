import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

export async function GET() {
  const data = await Database.read();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const newFavorite = await req.json();
    const favorites = await Database.read();

    if (favorites.some((f: any) => f.name === newFavorite.name)) {
      return NextResponse.json({ error: "Ya existe" }, { status: 409 });
    }
    //newFavorite.addedAt = new Date().toISOString();
    favorites.push(newFavorite);
    await Database.write(favorites);
    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/favorites", error);
    return NextResponse.json({ error: "Error actualizando favoritos" }, { status: 500 });
  }
}

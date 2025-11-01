import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 importante
) {
  try {
    const { id } = await context.params; // 👈 se resuelve con await

    const favorites = await Database.read();
    const newList = favorites.filter((f: any) => f.id !== id);

    if (newList.length === favorites.length) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    await Database.write(newList);
    return NextResponse.json({ message: "Eliminado correctamente" }, { status: 200 });
  } catch (error: any) {
    console.error("Error al eliminar favorito:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const favorites = await Database.read();
    const exists = favorites.find((f: any) => f.id === id);

    if (!exists) {
      return NextResponse.json(
        { error: "No encontrado" },
        { status: 404 }
      );
    }

    const newList = favorites.filter((f: any) => f.id !== id);
    await Database.write(newList);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error eliminando favorito:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

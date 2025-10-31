import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

interface Params {
  params: { id: string };
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await Database.remove(params.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    if (err.message === "NOT_FOUND")
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

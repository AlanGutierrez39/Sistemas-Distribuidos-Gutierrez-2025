import { NextResponse } from "next/server";
import { Database } from "@/app/lib/database";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const favorite = {
      id: body.id,
      addedAt: new Date().toISOString(),
    };

    await Database.add(favorite);

    return NextResponse.json(favorite, { status: 201 });
  } catch (err: any) {
    if (err.message === "ALREADY_EXISTS")
      return NextResponse.json({ error: "Already in favorites" }, { status: 409 });

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

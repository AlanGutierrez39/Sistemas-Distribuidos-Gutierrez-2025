import { promises as fs } from "fs";
import path from "path";

export interface Favorite {
  id: string; // nombre del Pokémon
  addedAt: string;
}

const DB_PATH = path.join(process.cwd(), "database.json");

export class Database {
  static async read(): Promise<Favorite[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf8");
      return data.trim() ? JSON.parse(data) : [];
    } catch (error: any) {
      // si no existe, lo creamos vacío
      if ((error as any)?.code === "ENOENT") {
        await fs.writeFile(DB_PATH, "[]", "utf8");
        return [];
      }
      throw error;
    }
  }

  static async write(data: Favorite[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  }
  
  static async add(fav: Favorite) {
    const favorites = await this.read();
    const exists = favorites.find((f) => f.id === fav.id);
    if (exists) throw new Error("ALREADY_EXISTS");
    favorites.push(fav);
    await this.write(favorites);
    return fav;
  }

  static async remove(id: string) {
    const favorites = await this.read();
    const index = favorites.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("NOT_FOUND");
    favorites.splice(index, 1);
    await this.write(favorites);
  }
}

import axios from "axios";

export async function addFavorite(id: string) {
  const res = await axios.post("/api/favorites", { id });
  return res.data;
}

export async function removeFavorite(id: string) {
  const res = await axios.delete(`/api/favorites/${id}`);
  return res.data;
}

export async function getFavorites() {
  const res = await axios.get("/database.json");
  return res.data;
}

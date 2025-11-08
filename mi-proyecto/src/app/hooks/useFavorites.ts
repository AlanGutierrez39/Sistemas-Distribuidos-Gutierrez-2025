import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Favorite {  
  id: string; // ID del Pokémon (nombre original)
  name: string; // nombre personalizado del usuario
  description: string;
  addedAt: string;
  customName?: string;
}

export function useFavorites() {
  return useQuery<Favorite[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axios.get("/api/favorites");
      return res.data;
    },
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fav: { id: string; addedAt: string; customName: string; description: string }) => {
      const res = await axios.post("/api/favorites", {
        ...fav,
        addedAt: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/favorites/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

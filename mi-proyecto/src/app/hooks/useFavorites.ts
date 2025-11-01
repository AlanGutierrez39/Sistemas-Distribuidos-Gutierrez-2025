import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Favorite {
  name: string;
  addedAt: string;
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
    mutationFn: async (pokemon: Favorite) => {
      const res = await axios.post("/api/favorites", { name: pokemon.name});//, addedAt: new Date().toISOString() 
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      await axios.delete(`/api/favorites/${name}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

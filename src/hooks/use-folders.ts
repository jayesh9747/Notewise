import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFolders, createFolder } from "@/lib/supabase/client";
import type { Folder } from "@/lib/supabase/client";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}

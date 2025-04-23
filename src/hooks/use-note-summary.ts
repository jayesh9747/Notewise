import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { summarizeText } from "@/lib/gemini/client";
import { supabase } from "@/lib/supabase/client";

export function useGenerateNoteSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      noteId,
      content,
      customPrompt,
    }: {
      noteId: string;
      content: string;
      customPrompt?: string;
    }) => {
      // Generate summary
      const summaryResult = await summarizeText(content, customPrompt);

      // Update note with summary in the database
      const { error } = await supabase
        .from("notes")
        .update({
          summary: summaryResult.summary,
          summary_updated_at: new Date().toISOString(),
        })
        .eq("id", noteId);

      if (error) {
        throw new Error("Failed to save summary to database");
      }

      return summaryResult;
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch the note query
      queryClient.invalidateQueries({ queryKey: ["note", variables.noteId] });
      toast.success("Note summary generated successfully");
    },
    onError: (error) => {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary: " + error.message);
    },
  });
}

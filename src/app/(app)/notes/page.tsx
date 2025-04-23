'use client';

import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotesGrid } from '@/components/notes/notes-grid';
import { useNotes } from '@/hooks/use-notes';

export default function NotesPage() {
  const { data: notes, isLoading } = useNotes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Notes</h1>
        <Link href="/notes/new">
          <Button className="gap-2">
            <FilePlus className="h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      <NotesGrid
        notes={notes}
        isLoading={isLoading}
        emptyMessage="No notes yet. Create a note to get started!"
      />
    </div>
  );
}
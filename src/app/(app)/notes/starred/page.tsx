'use client';

import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotesGrid } from '@/components/notes/notes-grid';
import { useStarredNotes } from '@/hooks/use-notes';

export default function StarredNotesPage() {
    const { data: notes, isLoading } = useStarredNotes();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Starred Notes</h1>
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
                emptyMessage="No starred notes yet. Star a note to see it here!"
            />
        </div>
    );
}
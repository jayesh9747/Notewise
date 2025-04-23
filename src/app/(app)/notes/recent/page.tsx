'use client';

import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotesGrid } from '@/components/notes/notes-grid';
import { useRecentNotes } from '@/hooks/use-notes';

export default function RecentNotesPage() {
    const { data: notes, isLoading } = useRecentNotes();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Recent Notes</h1>
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
                emptyMessage="No recent notes found. Create a note to get started!"
            />
        </div>
    );
}
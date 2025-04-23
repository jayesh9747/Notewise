'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { NotesGrid } from '@/components/notes/notes-grid';
import { Search } from 'lucide-react';
import { useSearchNotes } from '@/hooks/use-notes';

export default function SearchNotesPage() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const { data: notes, isLoading } = useSearchNotes(debouncedQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Search Notes</h1>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search notes by title or content..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {isLoading ? (
                <div>Searching...</div>
            ) : (
                <>
                    {debouncedQuery ? (
                        <NotesGrid
                            notes={notes || []}
                            emptyMessage={`No notes found for "${debouncedQuery}"`}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-center">
                            <p className="text-gray-500">Enter a search term to find notes</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
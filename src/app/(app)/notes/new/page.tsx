'use client';

import { NoteForm } from '@/components/notes/note-form';

export default function NewNotePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Note</h1>
            <NoteForm />
        </div>
    );
}
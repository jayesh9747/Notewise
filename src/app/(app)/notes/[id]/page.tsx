'use client';

import { NoteEditor } from '@/components/notes/note-editor';

interface NoteDetailPageProps {
    params: {
        id: string;
    };
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
    return <NoteEditor noteId={params.id} />;
}
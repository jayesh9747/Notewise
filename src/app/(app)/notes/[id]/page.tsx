'use client';

import React from 'react';
import { NoteEditor } from '@/components/notes/note-editor';

interface NoteDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
    const { id } = React.use(params);
    return <NoteEditor noteId={id} />;
}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FilePlus, FolderOpen } from 'lucide-react';
import { NotesGrid } from '@/components/notes/notes-grid';
import { useFolders } from '@/hooks/use-folders';
import { useNotesByFolder } from '@/hooks/use-notes';
import { use } from 'react'; // Import use from React

interface FolderDetailPageProps {
    params: {
        id: string;
    };
}

export default function FolderDetailPage({ params }: FolderDetailPageProps) {
    const { id } = use(params);
    const { data: notes, isLoading: notesLoading } = useNotesByFolder(id);
    const { data: folders } = useFolders();
    const [folderName, setFolderName] = useState('');
    
    useEffect(() => {
        if (folders) {
            const folder = folders.find(f => f.id === id);
            if (folder) {
                setFolderName(folder.name);
            }
        }
    }, [folders, id]);
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <FolderOpen className="h-6 w-6 text-primary" />
                    {folderName || 'Folder'}
                </h1>
                <Button asChild>
                    <Link href="/notes/new" className="gap-2">
                        <FilePlus className="h-4 w-4" />
                        New Note
                    </Link>
                </Button>
            </div>
            
            {notesLoading ? (
                <div>Loading notes...</div>
            ) : (
                <NotesGrid
                    notes={notes || []}
                    emptyMessage={`No notes in this folder yet. Create your first note!`}
                />
            )}
        </div>
    );
}
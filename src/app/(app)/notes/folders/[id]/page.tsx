'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FilePlus, FolderOpen } from 'lucide-react';
import { NotesGrid } from '@/components/notes/notes-grid';
import { useFolders } from '@/hooks/use-folders';
import { useNotesByFolder } from '@/hooks/use-notes';

interface FolderPageParams {
    id: string;
}

interface FolderPageProps {
    params: Promise<FolderPageParams>;
}

export default function FolderDetailPage({ params }: FolderPageProps) {
    const [folderId, setFolderId] = useState<string>('');
    const { data: notes, isLoading: notesLoading } = useNotesByFolder(folderId);
    const { data: folders } = useFolders();
    const [folderName, setFolderName] = useState('');

    useEffect(() => {
        params.then(({ id }) => {
            setFolderId(id);
        });
    }, [params]);

    useEffect(() => {
        if (folders && folderId) {
            const folder = folders.find(f => f.id === folderId);
            if (folder) {
                setFolderName(folder.name);
            }
        }
    }, [folders, folderId]);

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
                <div className="flex items-center justify-center h-screen w-full">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                        <p className="text-lg font-medium text-gray-700">Notes Loading...</p>
                    </div>
                </div>
            ) : (
                <NotesGrid
                    notes={notes || []}
                    emptyMessage={`No notes in this folder yet. Create your first note!`}
                />
            )}
        </div>
    );
}

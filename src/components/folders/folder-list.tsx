'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FolderOpen, FolderPlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useFolders } from '@/hooks/use-folders';
import { FolderForm } from './folder-form';

export function FolderList() {
  const pathname = usePathname();
  const { data: folders, isLoading } = useFolders();
  const [isCreating, setIsCreating] = useState(false);
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading folders...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Folders</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
      </div>
      
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Folder</CardTitle>
          </CardHeader>
          <CardContent>
            <FolderForm onSuccess={() => setIsCreating(false)} />
          </CardContent>
        </Card>
      )}
      
      {folders && folders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <Link 
              key={folder.id} 
              href={`/notes/folders/${folder.id}`}
              className="block"
            >
              <Card className={cn(
                "h-full cursor-pointer hover:shadow-md transition-shadow",
                pathname === `/notes/folders/${folder.id}` && "border-primary"
              )}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    {folder.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FolderOpen className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No folders yet</p>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Create your first folder
          </Button>
        </div>
      )}
    </div>
  );
}
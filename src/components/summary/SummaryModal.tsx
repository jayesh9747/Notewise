'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useGenerateNoteSummary } from '@/hooks/use-note-summary';

interface SummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    noteId: string;
    content: string;
    title: string;
    existingSummary?: string | null;
}

export function SummaryModal({
    isOpen,
    onClose,
    noteId,
    content,
    title,
    existingSummary,
}: SummaryModalProps) {
    const [customPrompt, setCustomPrompt] = useState('');
    const [summary, setSummary] = useState(existingSummary || '');

    const generateSummary = useGenerateNoteSummary();

    const handleGenerateSummary = async () => {
        generateSummary.mutate(
            {
                noteId,
                content,
                customPrompt: customPrompt.trim() !== '' ? customPrompt : undefined
            },
            {
                onSuccess: (data) => {
                    setSummary(data.summary);
                }
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        <span>Generate Summary for: {title}</span>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                    <DialogDescription>
                        Generate an AI-powered summary of your note
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Custom Instructions (Optional)</label>
                        <Textarea
                            placeholder="E.g., Make it concise and focus on action items"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="resize-none"
                            rows={2}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm font-medium">Summary</label>
                            {generateSummary.isPending && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Loader2 className="h-3 w-3 animate-spin" /> Generating...
                                </span>
                            )}
                        </div>
                        <Textarea
                            placeholder="Your summary will appear here"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="min-h-[200px] resize-none"
                            readOnly={generateSummary.isPending}
                        />
                    </div>
                </div>

                <DialogFooter className="sm:justify-between gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="sm:w-auto w-full"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleGenerateSummary}
                        disabled={generateSummary.isPending || !content.trim()}
                        className="sm:w-auto w-full"
                    >
                        {generateSummary.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate Summary'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, PenSquare } from 'lucide-react';
import { format } from 'date-fns';
import { SummaryModal } from './SummaryModal';

interface SummaryDisplayProps {
    noteId: string;
    noteTitle: string;
    noteContent: string;
    summary?: string | null;
    summaryUpdatedAt?: string | null;
}

export function SummaryDisplay({
    noteId,
    noteTitle,
    noteContent,
    summary,
    summaryUpdatedAt,
}: SummaryDisplayProps) {
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

    return (
        <>
            <Card className="mt-6 border border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-md flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>Note Summary</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsSummaryModalOpen(true)}
                            className="gap-1 text-xs"
                        >
                            <PenSquare className="h-3 w-3" />
                            {summary ? 'Update Summary' : 'Generate Summary'}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {summary ? (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
                            {summaryUpdatedAt && (
                                <div className="flex items-center text-xs text-gray-500 gap-1">
                                    <Clock className="h-3 w-3" />
                                    Generated: {format(new Date(summaryUpdatedAt), 'MMM d, yyyy h:mm a')}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 italic py-2">
                            No summary available. Generate one with the button above.
                        </div>
                    )}
                </CardContent>
            </Card>

            <SummaryModal
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                noteId={noteId}
                title={noteTitle}
                content={noteContent}
                existingSummary={summary}
            />
        </>
    );
}
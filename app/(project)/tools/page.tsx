import React from 'react';
import ToolsDirectory from '@/app/components/portfolio/ToolsDirectory';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Interactive Web Utilities | Workspace Hub',
    description: 'Explore full-featured client applications, developer utilities, and algorithmic sandboxes.',
};

export default function ToolsDirectoryPage() {
    return <ToolsDirectory />;
}

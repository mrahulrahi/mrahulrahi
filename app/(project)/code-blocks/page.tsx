import React from 'react';
import EducationalCodeBlocks from '@/app/components/portfolio/EducationalCodeBlocks';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Code Academy | Educational Playgrounds',
    description: 'Learn dynamic web architecture, algorithms, and data structures through live responsive playgrounds and code visualizers.',
};

export default function CodeBlocksPage() {
    return <EducationalCodeBlocks />;
}

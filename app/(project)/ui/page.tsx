import React from 'react';
import UiLibrarySandbox from '@/app/components/portfolio/UiLibrarySandbox';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Custom Component Sandbox | Spectrum UI Library',
    description: 'Explore, preview, and copy high-fidelity modular React elements and custom dashboard widgets.',
};

export default function UiLibraryPage() {
    return <UiLibrarySandbox />;
}

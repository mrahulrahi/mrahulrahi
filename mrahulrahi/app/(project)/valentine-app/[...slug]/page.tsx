import { Metadata } from 'next';
import ValentineClient from './ValentineClient';

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const personName = decodeURIComponent(params.slug[0]);
    const byName = params.slug[1] ? decodeURIComponent(params.slug[1]) : undefined;

    if (byName) {
        return {
            title: `Valentine's Gift for ${personName} from ${byName} 💖`,
            description: `A special Valentine's surprise for ${personName} from ${byName}.`,
        };
    }

    return {
        title: `Valentine's Gift for ${personName} 💖`,
        description: `A special Valentine's surprise for ${personName}.`,
    };
}

export default async function ValentinePage(props: PageProps) {
    const params = await props.params;
    const personName = params.slug[0]; // Next.js automatically decodes special chars in params but explicit decode is safer if double encoded, though usually raw slug is fine here if Client handles it.
    // However, to be consistent with previous logic, let's pass it as is or decoded.
    // ValentineClient expects `initialName` which it decodes.
    // Let's pass the raw slug segments.
    
    // Note: params.slug is an array.
    const byName = params.slug[1];

    return <ValentineClient initialName={personName} byName={byName} />;
}

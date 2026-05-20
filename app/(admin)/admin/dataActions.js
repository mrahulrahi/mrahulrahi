'use server'

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const dbPath = path.join(process.cwd(), 'app', 'data', 'db.json');

async function checkAuth() {
    const cookieStore = await cookies();
    if (!cookieStore.has('admin_auth_session')) {
        throw new Error('Unauthorized');
    }
}

export async function getPortfolioData() {
    await checkAuth();
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

export async function saveProject(project) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (project.id) {
        const index = data.projectsCards.findIndex(p => p.id === project.id);
        if (index !== -1) {
            data.projectsCards[index] = project;
        } else {
            data.projectsCards.push(project);
        }
    } else {
        project.id = Date.now();
        data.projectsCards.push(project);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); // Revalidate the main page
    return { success: true };
}

export async function deleteProject(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.projectsCards = data.projectsCards.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); // Revalidate the main page
    return { success: true };
}

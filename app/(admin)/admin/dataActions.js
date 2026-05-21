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

// --- Projects ---
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
    revalidatePath('/'); 
    return { success: true };
}

export async function deleteProject(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.projectsCards = data.projectsCards.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

// --- Timeline Items ---
export async function saveTimelineItem(item) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (item.id) {
        const index = data.timelineItems.findIndex(p => p.id === item.id);
        if (index !== -1) {
            data.timelineItems[index] = item;
        } else {
            data.timelineItems.push(item);
        }
    } else {
        item.id = Date.now();
        data.timelineItems.push(item);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

export async function deleteTimelineItem(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.timelineItems = data.timelineItems.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

// --- Certificates ---
export async function saveCertificate(cert) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (cert.id) {
        const index = data.certificates.findIndex(p => p.id === cert.id);
        if (index !== -1) {
            data.certificates[index] = cert;
        } else {
            data.certificates.push(cert);
        }
    } else {
        cert.id = Date.now();
        data.certificates.push(cert);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

export async function deleteCertificate(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.certificates = data.certificates.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

// --- Interests ---
export async function saveInterest(interest) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (interest.id) {
        const index = data.interest.findIndex(p => p.id === interest.id);
        if (index !== -1) {
            data.interest[index] = interest;
        } else {
            data.interest.push(interest);
        }
    } else {
        interest.id = Date.now();
        data.interest.push(interest);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

export async function deleteInterest(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.interest = data.interest.filter(p => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/'); 
    return { success: true };
}

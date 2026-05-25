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

export async function getPublicPortfolioData() {
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

// --- Hero Data ---
export async function saveHeroData(hero) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.hero = hero;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

// --- About Data ---
export async function saveAboutData(about) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data.about = about;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

// --- Stats ---
export async function saveStatItem(stat) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.stats) data.stats = [];
    
    if (stat.id) {
        const index = data.stats.findIndex(p => p.id === stat.id);
        if (index !== -1) {
            data.stats[index] = stat;
        } else {
            data.stats.push(stat);
        }
    } else {
        stat.id = Date.now();
        data.stats.push(stat);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

export async function deleteStatItem(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (data.stats) {
        data.stats = data.stats.filter(p => p.id !== id);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    }
    revalidatePath('/');
    return { success: true };
}

// --- Skills ---
export async function saveSkillItem(skill) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.skills) data.skills = [];
    
    if (skill.id) {
        const index = data.skills.findIndex(p => p.id === skill.id);
        if (index !== -1) {
            data.skills[index] = skill;
        } else {
            data.skills.push(skill);
        }
    } else {
        skill.id = Date.now();
        data.skills.push(skill);
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

export async function deleteSkillItem(id) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (data.skills) {
        data.skills = data.skills.filter(p => p.id !== id);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    }
    revalidatePath('/');
    return { success: true };
}

// --- UI Components & Tools Visibility ---
export async function getUiToolsData() {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return {
        uiComponents: data.uiComponents || [],
        tools: data.tools || []
    };
}

export async function saveUiComponentVisibility(id, visible) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.uiComponents) data.uiComponents = [];
    const index = data.uiComponents.findIndex(c => c.id === id);
    if (index !== -1) {
        data.uiComponents[index].visible = visible;
    } else {
        data.uiComponents.push({ id, visible });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

export async function saveToolVisibility(id, visible) {
    await checkAuth();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.tools) data.tools = [];
    const index = data.tools.findIndex(t => t.id === id);
    if (index !== -1) {
        data.tools[index].visible = visible;
    } else {
        data.tools.push({ id, visible });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    revalidatePath('/');
    return { success: true };
}

export async function getPublicUiToolsData() {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return {
        uiComponents: data.uiComponents || [],
        tools: data.tools || []
    };
}

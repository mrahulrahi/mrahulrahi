import db from './db.json';
import { TimelineItem } from '@/app/(admin)/admin/dataActions';

export const projectsCards = db.projectsCards;
export const interest = db.interest;
export const timelineItems: TimelineItem[] = db.timelineItems as TimelineItem[];
export const certificates = db.certificates;
export const hero = (db as any).hero;
export const stats = (db as any).stats;
export const about = (db as any).about;
export const skills = (db as any).skills;

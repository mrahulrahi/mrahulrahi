'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './Valentine.module.css';

// --- TYPES ---
interface TimelineItem {
    date: string;
    title: string;
    content: string;
    longContent: string;
    emoji: string;
}

interface HeartRainProps {
    count?: number;
}

interface PerspectiveCardProps {
    item: TimelineItem;
    unlocked: boolean;
    onClick: (item: TimelineItem) => void;
    getCountdown: (targetDate: string) => string | null;
}

// --- HEART RAIN COMPONENT (No changes) ---
const HeartRain: React.FC<HeartRainProps> = ({ count = 12 }) => {
    const hearts = Array.from({ length: count });
    return (
        <div className={styles.heartContainer}>
            {hearts.map((_, i) => (
                <motion.div
                    key={i}
                    className={styles.floatingHeart}
                    initial={{ y: -100, x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{
                        y: "110vh",
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

// --- NEW PERSPECTIVE CARD COMPONENT ---
const PerspectiveCard: React.FC<PerspectiveCardProps> = ({ item, unlocked, onClick, getCountdown }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Map position to rotation degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layoutId={item.title}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => unlocked && onClick(item)}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className={`${styles.card} ${unlocked ? styles.unlocked : styles.locked}`}
            whileHover={unlocked ? { scale: 1.02 } : {}}
        >
            <svg className={styles.cardSvg} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <div className={styles.cardContent}>
                <span className={styles.cardDate}>{item.date}</span>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                {unlocked ? (
                    <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className={styles.tapText}>Open Letter ✨</motion.p>
                ) : (
                    <p className={styles.countdownText}>{getCountdown(item.date)}</p>
                )}
            </div>
        </motion.div>
    );
};

// --- MAIN APP ---
const ValentineApp = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeModal, setActiveModal] = useState<TimelineItem | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeline: TimelineItem[] = [
        { date: '2026-02-07', title: "Rose Day", content: "A rose for my rose.", longContent: "Like a rose, your presence adds color and fragrance to my life every single day. I'm so lucky to have you.", emoji: "🌹" },
        { date: '2026-02-08', title: "Propose Day", content: "Choosing you, always.", longContent: "I don't just want you for a day; I want you for every tomorrow we can dream of. Will you be mine forever?", emoji: "💍" },
        { date: '2026-02-09', title: "Chocolate Day", content: "Sweetest of all.", longContent: "Life is like a box of chocolates, but you are the sweetest part of the whole box. Love you tons!", emoji: "🍫" },
        { date: '2026-02-10', title: "Teddy Day", content: "A virtual hug.", longContent: "Something soft and warm to remind you of my hugs whenever I'm not around. You're my favorite cuddle partner.", emoji: "🧸" },
        { date: '2026-02-11', title: "Promise Day", content: "My word to you.", longContent: "I promise to be your biggest fan, your strongest support, and your best friend through everything.", emoji: "🤝" },
        { date: '2026-02-12', title: "Hug Day", content: "Tight squeeze!", longContent: "There is no place in the world safer than inside a hug from you. Sending you a huge squeeze today!", emoji: "🫂" },
        { date: '2026-02-13', title: "Kiss Day", content: "Sending love.", longContent: "A kiss is a lovely trick designed by nature to stop speech when words become superfluous. *Mwah!*", emoji: "💋" },
        { date: '2026-02-14', title: "Valentine's Day", content: "My Forever.", longContent: "Happy Valentine's Day! You make every ordinary moment feel extraordinary. I love you to the moon and back.", emoji: "❤️" },
    ];

    const getCountdown = (targetDate: string) => {
        const diff = +new Date(targetDate) - +currentTime;
        if (diff <= 0) return null;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        return `${d}d ${h}h ${m}m ${s}s`;
    };

    return (
        <div className={styles.appWrapper}>
            <HeartRain />

            {/* Background Blobs */}
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className={styles.bgBlob} style={{ top: '5%', left: '10%' }}
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className={styles.bgBlob} style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(255,117,143,0.2) 0%, transparent 70%)' }}
            />

            <header className={styles.header}>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.title}>
                    Our Love Story
                </motion.h1>
                <p className={styles.subtitle}>Every day is a reason to love you Gudiya ♥️.</p>
            </header>

            <motion.div className={styles.grid}>
                {timeline.map((item, idx) => (
                    <PerspectiveCard 
                        key={idx} 
                        item={item} 
                        unlocked={currentTime >= new Date(item.date)} 
                        onClick={setActiveModal} 
                        getCountdown={getCountdown}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {activeModal && (
                    <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)}>
                        <HeartRain count={20} />
                        <motion.div
                            className={styles.modal}
                            layoutId={activeModal.title}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1.2 }} className={styles.modalEmoji}>{activeModal.emoji}</motion.span>
                            <svg className={styles.modalSvg1} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg className={styles.modalSvg2} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <h1 className={styles.modalTitle}>{activeModal.title}</h1>
                            <div className={styles.divider}></div>
                            <p className={styles.modalText}>{activeModal.longContent}</p>
                            <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>Close with Love</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentineApp;
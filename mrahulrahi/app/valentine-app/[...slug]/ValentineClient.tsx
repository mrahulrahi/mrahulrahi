'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './Valentine.module.css';
import AudioPlayer from './AudioPlayer';
import ProposalModal from './ProposalModal';
import CursorTrail from './CursorTrail';
import { timeline, loveReasons, TimelineItem } from './constants';

// --- TYPES ---

interface HeartRainProps {
    count?: number;
}

interface PerspectiveCardProps {
    item: TimelineItem;
    unlocked: boolean;
    onClick: (item: TimelineItem) => void;
    getCountdown: (targetDate: string) => React.ReactNode;
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
                    <div className={styles.lockedContent}>
                        <span className={styles.lockIcon}>🔒</span>
                        {getCountdown(item.date)}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Typewriter Component
const TypewriterText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30); // Integrated a smoother, slightly faster speed
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {displayedText}
            <span className={styles.cursor}>|</span>
        </span>
    );
};

const ShareButton = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button onClick={handleShare} className={styles.shareBtn} aria-label="Share this page">
            {copied ? "Link Copied! ✨" : "Share Love 🔗"}
        </button>
    );
};

// --- MAIN APP ---
interface ValentineClientProps {
    initialName: string;
    byName: string;
}

const ValentineClient: React.FC<ValentineClientProps> = ({ initialName, byName }) => {
    // Helper to get current IST time
    const getISTDate = () => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * 5.5)); // UTC + 5:30
    };

    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [activeModal, setActiveModal] = useState<TimelineItem | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [showProposal, setShowProposal] = useState(false);

    // Safely decode name
    let personName = "My Love";
    try {
        personName = initialName ? decodeURIComponent(initialName) : "My Love";
    } catch (e) {
        console.error("Failed to decode name:", e);
        personName = initialName || "My Love";
    }
    const rawName = initialName;

    let authorName = "Your Love";
    try {
        authorName = byName ? decodeURIComponent(byName) : "Your Love";
    } catch (e) {
        console.error("Failed to decode name:", e);
        authorName = byName || "Your Love";
    }

    useEffect(() => {
        setIsMounted(true);
        setCurrentTime(getISTDate());
        const timer = setInterval(() => setCurrentTime(getISTDate()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (rawName) {
            localStorage.setItem('valentineName', rawName);
        }
    }, [rawName]);

    // Helper to parse DD-MM-YYYY to Date object
    const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('-').map(Number);
        // Create date object for that specific day at 00:00:00 IST
        // constructing ISO string: YYYY-MM-DDTHH:mm:ss+05:30
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00+05:30`;
        return new Date(isoDate);
    };

    // Helper to check if a date is unlocked in IST
    const isUnlocked = (targetDateStr: string) => {
        if (!currentTime) return false; // Locked by default/server
        const targetTime = parseDate(targetDateStr).getTime();
        return currentTime.getTime() >= targetTime;
    };

    const getCountdown = (targetDateStr: string) => {
        if (!currentTime) return null;
        const targetTime = parseDate(targetDateStr).getTime();
        const diff = targetTime - currentTime.getTime();

        if (diff <= 0) return null;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        
        // Return object for new UI
        return { d, h, m, s };
    };

     // Wrapper for new countdown UI
    const getCountdownNode = (targetDateStr: string) => {
        const t = getCountdown(targetDateStr);
        if (!t) return null;
        return (
             <div className={styles.countdownText}>
                <div className={styles.timeBox}>
                    <span className={styles.timeVal}>{t.d}</span>
                    <span className={styles.timeLabel}>Day</span>
                </div>
                <div className={styles.timeBox}>
                    <span className={styles.timeVal}>{t.h}</span>
                    <span className={styles.timeLabel}>Hrs</span>
                </div>
                <div className={styles.timeBox}>
                    <span className={styles.timeVal}>{t.m}</span>
                    <span className={styles.timeLabel}>Min</span>
                </div>
                <div className={styles.timeBox}>
                    <span className={styles.timeVal}>{t.s}</span>
                    <span className={styles.timeLabel}>Sec</span>
                </div>
            </div>
        )
    };

    // --- LOVE REASONS GENERATOR ---
    const [showReason, setShowReason] = useState(false);
    const [currentReason, setCurrentReason] = useState("");

    const generateReason = () => {
        const random = loveReasons[Math.floor(Math.random() * loveReasons.length)];
        setCurrentReason(random);
        setShowReason(true);
    };

    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleCardClick = (item: TimelineItem) => {
        if (item.title === "Valentine's Day") {
            setShowProposal(true);
        } else {
            setActiveModal(item);
        }
    };

    const handleProposalYes = () => {
        setShowProposal(false);
        // Find Valentine's Day item
        const vDayItem = timeline.find(t => t.title === "Valentine's Day");
        if (vDayItem) setActiveModal(vDayItem);
    };

    if (!isMounted) {
        return null; // Prevent hydration mismatch by not rendering until mounted
    }

    return (
        <div className={`${styles.appWrapper} ${darkMode ? styles.darkMode : ''}`}>
            <CursorTrail />
            <AudioPlayer />
            <HeartRain />

            {/* Generator Button */}
            <button onClick={generateReason} className={styles.generatorBtn} aria-label="Why I Love You">
                Why I Love You 💌
            </button>

            {/* Proposal Modal */}
            <ProposalModal 
                isOpen={showProposal} 
                onClose={() => setShowProposal(false)} 
                onYes={handleProposalYes} 
            />

            {/* Reason Modal */}
            <AnimatePresence>
                {showReason && (
                    <motion.div 
                        className={styles.modalOverlay} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={() => setShowReason(false)}
                        style={{ zIndex: 1100 }} // Higher than other modals
                    >
                        <motion.div
                            className={styles.reasonModal}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>One of the many reasons...</h3>
                            <p className={styles.reasonText}>"{currentReason}"</p>
                            <button className={styles.closeBtn} onClick={() => setShowReason(false)}>I Know! 🥰</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Blobs */}
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className={styles.bgBlob} style={{ top: '5%', left: '10%' }}
            />
            {/* ... other background blobs ... */}

            <header className={styles.header}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={toggleTheme} className={styles.shareBtn} aria-label="Toggle Theme">
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                    <ShareButton />
                </div>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.title}>
                    Our Love Story
                </motion.h1>
                <p className={styles.subtitle}>Every day is a reason to love you <span className={styles.name}>{personName}</span> ♥️.</p>
            </header>

            <motion.div className={styles.grid} role="list">
                {timeline.map((item, idx) => (
                    <div key={idx} role="listitem" style={{ display: 'contents' }}>
                        <PerspectiveCard
                            item={item}
                            unlocked={isUnlocked(item.date)}
                            onClick={handleCardClick}
                            getCountdown={getCountdownNode}
                        />
                    </div>
                ))}
            </motion.div>

            <AnimatePresence>
                {activeModal && (
                    <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <HeartRain count={50} />
                        <motion.div
                            className={styles.modal}
                            layoutId={activeModal.title}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1.2 }} className={styles.modalEmoji} role="img" aria-label={activeModal.title}>{activeModal.emoji}</motion.span>
                            <svg className={styles.modalSvg1} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg className={styles.modalSvg2} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <h1 id="modal-title" className={styles.modalTitle}>{activeModal.title}</h1>
                            <div className={styles.divider}></div>
                            <p className='text-start'>Dear <span className={styles.name}>{personName}</span>,</p>
                            <p className={styles.modalText}>
                                <TypewriterText text={activeModal.longContent} />
                            </p>
                            <p className='text-end'>With Love, <br />
                                <span className={styles.name}>{authorName}</span>
                            </p>

                            <button className={styles.closeBtn} onClick={() => setActiveModal(null)} aria-label="Close modal">Close with Love</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentineClient;

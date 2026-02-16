'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Valentine.module.css';

interface ProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onYes: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onYes }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hoverCount, setHoverCount] = useState(0);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100; // -100 to 100
        const y = Math.random() * 200 - 100;
        setNoBtnPosition({ x, y });
        setHoverCount(prev => prev + 1);
    };

    const getNoButtonText = () => {
        const texts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't break my heart!", "Okay fine..."];
        return texts[Math.min(hoverCount, texts.length - 1)];
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ zIndex: 2000 }} // Highest z-index
                >
                    <motion.div
                        className={styles.proposalModal}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                    >
                        <h2 className={styles.proposalTitle}>Will you be my Valentine? 🌹</h2>
                        <div className={styles.proposalButtons}>
                            <button className={styles.yesBtn} onClick={onYes}>
                                YES! ❤️
                            </button>
                            <motion.button
                                className={styles.noBtn}
                                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                                onHoverStart={moveNoButton}
                                onClick={moveNoButton}
                                style={{ position: 'relative' }}
                            >
                                {getNoButtonText()}
                            </motion.button>
                        </div>
                        <button className={styles.maybeLaterBtn} onClick={onClose}>
                            Maybe later...
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProposalModal;

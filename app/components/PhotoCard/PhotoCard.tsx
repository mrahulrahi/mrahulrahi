'use client';
import './PhotoCard.css'
import { motion } from "framer-motion"

interface Props {
    item: Item;
}

interface Item {
    title: string;
    url: string;
}

const PhotoCard = ({ item }: Props) => {
    return (
        <>
            <a href={item.url} data-lightbox="gallery-img" data-title="caption">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                    className="gallery-link">
                    <figure className="gallery-thumb">
                        <img src={item.url} alt={item.title} className="gallery-image" />
                        {item.title &&
                            <figcaption className="gallery-caption">{item.title}</figcaption>}
                    </figure>
                </motion.div>
            </a>
        </>
    )
}

export default PhotoCard
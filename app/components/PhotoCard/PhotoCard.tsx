import './PhotoCard.css'

interface Props {
    item : Item;
}

interface Item {
    title: string;
    url: string;
}

const PhotoCard = ({item} : Props) => {
    return (
        <>
            <a href={item.url} data-lightbox="gallery-img" data-title="caption" data-aos="fade-up">
                <div className="gallery-link">
                    <figure className="gallery-thumb">
                        <img src={item.url} alt={item.title} className="gallery-image" />
                        <figcaption className="gallery-caption">{item.title}</figcaption>
                    </figure>
                </div>
            </a>
        </>
    )
}

export default PhotoCard
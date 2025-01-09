import './VideoCard.css'


interface Item {
  id: string;
  title: string;
}

const VideoCard = ({ id, title }: Item) => {
  return (
    <>
      <div className="video-card-box">
        <div className="video-card-iframe">
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player" frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
        <div className="video-card-text">
          <h5>{title}</h5>
        </div>
      </div>
    </>
  )
}

export default VideoCard
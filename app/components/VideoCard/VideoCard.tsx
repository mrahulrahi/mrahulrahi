import './VideoCard.css'
interface Props {
  item : Item[];
}

interface Item {
  id: number;
  url : string;
  title: string;
}

const VideoCard = ({item} : Props) => {
  return (
    <>
      <div className="video-card-box bg-yellow">
        <div className="video-card-iframe">
          <iframe width="560" height="315" src={item.url}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
        <div className="video-card-text">
          <h5>{item.title}</h5>
        </div>
      </div>
    </>
  )
}

export default VideoCard
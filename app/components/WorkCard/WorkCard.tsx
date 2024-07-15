import Link from 'next/link';
import './WorkCard.css'
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
  card: Item;
}

interface Item {
  id: number;
  imgUrl: string;
  title: string;
  label: string;
  url: string;
  para: string;
}

const WorkCard = ({ card }: Props) => {

  return (
    <>
      <div className="work-box d-flex flex-wrap justify-content-between bg-violet">
        <div className="wb-img-frame">
          <div className="wb-img-head d-flex align-items-center justify-content-end pe-3">
            <ul className="wb-ih-dots d-flex align-items-center justify-content-end gap-1"><li></li><li></li><li></li></ul>
          </div>
          <div className="wb-img"> <img src={card.imgUrl} alt="" /> </div>
        </div>

        <div className="wb-text d-flex flex-column">
          <h3> {card.label} </h3>
          <h5> {card.title} </h5>
          <p> {card.para}</p>
          <Link href={card.url} className="link-btn d-flex flex-wrap align-items-center mt-auto">See Project
            <div className="arrow-icon d-flex align-items-center justify-content-center"> <FaArrowRightLong /></div></Link>
        </div>
      </div>
    </>
  )
}

export default WorkCard
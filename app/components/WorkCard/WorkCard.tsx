import Link from 'next/link';
import './WorkCard.css'
import { FaArrowRightLong } from "react-icons/fa6";
import * as RiIcons from "react-icons/ri";

interface Props {
  card: Item;
}

interface Item {
  id: number;
  imgUrl: string;
  title: string;
  label: string;
  liveUrl: string;
  para: string;
  technologies?: string[];
}

const WorkCard = ({ card }: Props) => {
      const IconOneComponent = card.technologies && card.technologies[0]
          ? RiIcons[card.technologies[0] as keyof typeof RiIcons]
          : null;
      const IconTwoComponent = card.technologies && card.technologies[1]
          ? RiIcons[card.technologies[1] as keyof typeof RiIcons]
          : null;
      const IconThreeComponent = card.technologies && card.technologies[2]
          ? RiIcons[card.technologies[2] as keyof typeof RiIcons]
          : null;
      const IconFourComponent = card.technologies && card.technologies[3]
          ? RiIcons[card.technologies[3] as keyof typeof RiIcons]
          : null;

  return (
    <>
      <Link className="work-box d-flex flex-wrap justify-content-between bg-violet w-100 h-100" href={card.liveUrl}>
        <div className="wb-img-frame">
          <div className="wb-img-head d-flex align-items-center justify-content-end pe-3">
            <ul className="wb-ih-dots d-flex align-items-center justify-content-end gap-1"><li></li><li></li><li></li></ul>
          </div>
          <div className="wb-img"> <img src={card.imgUrl} alt="" /> </div>
        </div>

        <div className="wb-text d-flex flex-column">
          <h3 className="bg-clip-text bg-gradient-1 fw-bold"> {card.label} </h3>
          <h5> {card.title} </h5>
          <p className="mb-2"> {card.para}</p>
                <div className="badge-list d-flex gap-2 fs-4 mb-3">
                        {IconOneComponent && <div className="badge-item text-accent"><IconOneComponent /></div>}
                        {IconTwoComponent && <div className="badge-item text-accent"><IconTwoComponent /></div>}
                        {IconThreeComponent && <div className="badge-item text-accent"><IconThreeComponent /></div>}
                        {IconFourComponent && <div className="badge-item text-accent"><IconFourComponent /></div>}
                    </div>
          <span className="link-btn d-flex flex-wrap align-items-center mt-auto">See Project
            <div className="arrow-icon d-flex align-items-center justify-content-center"> <FaArrowRightLong /></div></span>
        </div>
      </Link>
    </>
  )
}

export default WorkCard
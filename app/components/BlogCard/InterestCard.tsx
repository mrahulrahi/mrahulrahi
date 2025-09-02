import './InterestCard.css'
import * as LuIcons from "react-icons/lu";

interface InterestCard {
  title: string;
  desc: string;
  url: string;
  imgUrl: string;
  items: { label: string; icon: string }[];
  createdBy: string
}

const InterestCard = (interest: InterestCard) => {
   const IconOneComponent = LuIcons[interest.items[0].icon as keyof typeof LuIcons];
   const IconTwoComponent = LuIcons[interest.items[1].icon as keyof typeof LuIcons];

  return (
    <>
      <div className="interest-card-item">
        <a href={interest.url} className="interest-card-box d-flex flex-column">
          <div className="interest-card-image">
            <img src={interest.imgUrl} alt={interest.title} loading="lazy" />
          </div>
          <div className="interest-card-text">
            <h4>{interest.title}</h4>
            <p>{interest.desc}</p>
          </div>

          <div className="interest-card-cta mt-auto">
            <ul className="d-flex align-items-center justify-content-between">
              <li className="interest-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                <IconOneComponent /> {interest.items[0].label}
              </li>
              <li className="interest-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                <IconTwoComponent />{interest.items[1].label}
              </li>
            </ul>

            <ul className="interest-card-cta-list">
              <li className="interest-card-avatar d-flex align-items-center justify-content-between">
                <img src="/hero-img.jpg" alt="Avatar" loading="lazy" />
                <p>Created by <span>{interest.createdBy}</span></p>
              </li>
            </ul>
          </div>
        </a>
      </div>
    </>)
};

export default InterestCard
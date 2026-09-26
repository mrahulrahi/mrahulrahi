import Image from 'next/image';
import './InterestCard.css'
import { getIconComponent } from '@/app/components/portfolio/icons';
import { LuSparkles } from 'react-icons/lu';

interface InterestCard {
  title: string;
  desc: string;
  url: string;
  imgUrl: string;
  items: { label: string; icon: string }[];
  createdBy: string
}

const InterestCard = (interest: InterestCard) => {
   const IconOneComponent = interest.items?.[0]?.icon ? getIconComponent(interest.items[0].icon) : null;
   const IconTwoComponent = interest.items?.[1]?.icon ? getIconComponent(interest.items[1].icon) : null;

  return (
    <>
      <div className="interest-card-item">
        <a 
          href={interest.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="interest-card-box d-flex flex-column"
          aria-label={`Explore ${interest.title}`}
        >
          <div className="interest-card-image">
            <Image
              src={interest.imgUrl}
              alt={interest.title}
              loading="lazy"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="interest-card-text">
            <h3>{interest.title}</h3>
            <p>{interest.desc}</p>
          </div>

          <div className="interest-card-cta mt-auto">
            <ul className="interest-card-cta-list d-flex align-items-center justify-content-between">
              <li className="interest-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                {IconOneComponent ? <IconOneComponent /> : <LuSparkles />} {interest.items?.[0]?.label}
              </li>
              <li className="interest-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                {IconTwoComponent ? <IconTwoComponent /> : <LuSparkles />}{interest.items?.[1]?.label}
              </li>
            </ul>
          </div>
        </a>
      </div>
    </>)
};

export default InterestCard
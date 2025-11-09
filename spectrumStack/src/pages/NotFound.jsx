import { Link } from 'react-router';
import Hero from "../components/Hero";

const NotFound = () => {
  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000?random=1" title="404 - Page Not Found" subTitle="The page you are looking for does not exist." />
      <div className="mx-auto py-10"><Link className="btn btn-success" to="/" >Go to Home</Link></div>
    </>
  );
};

export default NotFound;

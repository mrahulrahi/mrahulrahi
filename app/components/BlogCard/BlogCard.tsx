import './BlogCard.css'
import * as LuIcons from "react-icons/lu";

interface BlogCard {
  title: string;
  description: string;
  url: string;
  cover_image: string;
  public_reactions_count: string;
  published_at: string;
  user: {
    name: string;
    profile_image: string;
  };
}

const BlogCard = (blog: BlogCard) => {

  return (
    <>
        <a href={blog.url} className="blog-card-box d-flex flex-column">
          <div className="blog-card-image">
            <img src={blog.cover_image ? blog.cover_image : `https://placehold.co/800/1B9C85/white?text=${blog.title}&font=poppins`} alt={blog.title} loading="lazy" />
          </div>
          <div className="blog-card-text">
            <h4>{blog.title}</h4>
            <p>{blog.description}</p>
          </div>

          <div className="blog-card-cta mt-auto">
            <ul className="d-flex align-items-center justify-content-between">
              <li className="blog-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                <LuIcons.LuHeart /> {blog.public_reactions_count}
              </li>
              <li className="blog-card-cta-item d-flex gap-2 align-items-center justify-content-between">
                <LuIcons.LuCalendarDays />{blog.published_at.slice(0, 10).split('-').reverse().join('/')}
              </li>
            </ul>

            <ul className="blog-card-cta-list">
              <li className="blog-card-avatar d-flex align-items-center justify-content-between">
                <img src={blog.user.profile_image} alt={blog.user.name} loading="lazy" />
                <p>Article by <span>{blog.user.name}</span></p>
              </li>
            </ul>
          </div>
        </a>
    </>)
};

export default BlogCard
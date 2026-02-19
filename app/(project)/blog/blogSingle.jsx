import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Hero from "../../components/Hero";
import { useGradient } from "../../context/GradientContext.jsx";


const BlogPage = () => {
  const { gradientStyle } = useGradient();
  const { blogId } = useParams();  // Get the blogId from the URL
  const [post, setPost] = useState(null);  // State to store the post data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [blogId]);  // The effect will run when blogId changes

  if (loading) {
    return <p>Loading...</p>;  // Show loading text while the data is being fetched
  }


  return (
    <>
      <Hero title={post.title} subTitle={`Blog ${post.id}`} gradientColor={gradientStyle} />

      <div className="py-10 lg:py-20">
        <div className="container-fluid">
          <div className="max-w-4xl mx-auto">
            <div className="card w-full p-6 lg:p-14 bg-white/10 border border-[#ccc] rounded-xl">
              <div className='badge badge-primary badge-lg mb-2'>{post.id}</div>
              <h2 className="card-title">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;

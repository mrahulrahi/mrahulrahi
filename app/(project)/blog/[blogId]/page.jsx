'use client'
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Hero from "../../components/Hero.jsx";
import { useGradient } from "../../../context/GradientContext.jsx";


const BlogPage = () => {
  const { gradientStyle } = useGradient();
  const { blogId } = useParams();  // Get the blogId from the URL

  const fetchPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    return res.json();
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchPost(blogId),
    enabled: !!blogId, // Only fetch if blogId is available
  });

  if (isLoading) {
    return <div className="py-20 text-center text-white">Loading...</div>;
  }

  if (isError || !post || Object.keys(post).length === 0) {
    return <div className="py-20 text-center text-white">Post not found. {error?.message}</div>;
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

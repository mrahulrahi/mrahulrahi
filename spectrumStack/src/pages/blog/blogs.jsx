import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Link } from "react-router"; // Fixed the import
import Hero from "../../components/Hero";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch blogs using React Query
  const fetchBlogs = async (page) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
      { cache: 'no-store' }
    );
    const total = parseInt(res.headers.get("x-total-count") || "0", 10);
    const data = await res.json();
    return { data, total };
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', currentPage],
    queryFn: () => fetchBlogs(currentPage),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (isLoading) {
    return <div className="py-20">Loading blogs...</div>;
  }

  if (isError) {
    return <div className="py-20">Error: {error.message}</div>;
  }

  const pageCount = Math.ceil(data.total / limit);
  const blogs = data.data;

  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000?random=3" title="From the blog" subTitle="Blog" />

      <div className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mb-6">
            {blogs.map((blog) => (
              <div className="w-1/2 px-3 mb-6" key={blog.id}>
                <Link className="card flex flex-col h-full p-8 bg-white/10 border border-[#ccc] rounded-xl group"  to={`/blog/${blog.id}`} >
                  <div className="badge badge-primary mb-2">{blog.id}</div>
                  <h3 className="card-title text-white capitalize line-clamp-2">{blog.title}</h3>
                  <p className="card-text line-clamp-3">{blog.body}</p>
                  <div className="card-actions justify-start mt-auto">
                    <span className="text-white underline group-hover:no-underline">Read More</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"join flex items-center justify-center my-10"}
          pageClassName={"join-item btn flex items-center h-10 py-2 px-4 text-white cursor-pointer hover:bg-second hover:text-first"}
          pageLinkClassName={""}
          previousClassName={"join-item btn flex items-center h-10 py-2 px-4 text-white cursor-pointer hover:bg-second hover:text-first"}
          previousLinkClassName={""}
          nextClassName={"join-item btn flex items-center h-10 py-2 px-4 text-white cursor-pointer hover:bg-second hover:text-first"}
          nextLinkClassName={""}
          breakClassName={"join-item btn flex items-center h-10 py-2 px-4 text-white cursor-pointer hover:bg-second hover:text-first"}
          breakLinkClassName={""}
          activeClassName={"bg-white !text-first"}
          forcePage={currentPage - 1}  // Keep pagination in sync with current page
        />
      </div>
    </>
  );
};

export default BlogPage;
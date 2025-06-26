import React, { useEffect, useState } from "react";
import { assets, blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import Loader from "./Loader";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input, fetchBlogs, isLoading } = useAppContext();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const visibleBlogs = filteredBlogs().filter(
    (blog) => menu === "All" || blog.category === menu
  );

  return isLoading ? (
    <div className="my-20 text-center">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="flex justify-center gap-3 md:gap-4 lg:gap-8 xl:gap-12 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className="col-span-full flex justify-center">
            <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
              <p>Blog kosong</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;

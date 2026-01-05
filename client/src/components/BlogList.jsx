import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import {motion} from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';
import categoryService from '../services/categoryService';

const BlogList = () => {
    const [menu, setMenu] = useState("Tất cả");
    const [categories, setCategories] = useState([]);
    const { blogs, input, loading } = useAppContext();

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await categoryService.getAllCategories();
          if (response.success) {
            setCategories([{ _id: 'all', name: 'Tất cả' }, ...response.data]);
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
      fetchCategories();
    }, []);

    const filteredBlogs = () => {
      let filtered = blogs;
      
      // Filter by search input
      if (input !== '') {
        filtered = filtered.filter((blog) => 
          blog.title?.toLowerCase().includes(input.toLowerCase()) || 
          blog.category?.name?.toLowerCase().includes(input.toLowerCase())
        );
      }
      
      // Filter by category
      if (menu !== "Tất cả") {
        filtered = filtered.filter((blog) => blog.category?.name === menu);
      }
      
      return filtered;
    }


  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'>
        {categories.map((item) => (
            <div key={item._id} className='relative'>
                <button onClick={() => setMenu(item.name)}
                className={`cursor-pointer text-primary ${menu === item.name && 'text-white px-4 pt-0.5'}`}>
                    {item.name}
                    {menu === item.name && (
                        <motion.div layoutId='underline'
                        transition={{type: 'spring', stiffness: 500, damping: 30}}
                         className='absolute left-0 right-0 top-0
                        h-7 -z-1 bg-primary rounded-full'></motion.div>
                    )}
                    
                </button>

            </div>
        ))}
      </div>
      
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
          {filteredBlogs().length === 0 ? (
            <div className='col-span-full text-center text-gray-500 py-10'>
              Không tìm thấy bài viết nào
            </div>
          ) : (
            filteredBlogs().map((blog) => <BlogCard key={blog._id} blog={blog}/>)
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList

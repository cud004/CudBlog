import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

    const {title, content, category, image, _id, subTitle, description} = blog;

    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg
    overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
      <img src={image} alt={title} className='aspect-video object-cover'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20
      rounded-full text-primary text-xs'>{category?.name || 'Uncategorized'}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900 line-clamp-2'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600 line-clamp-3'>
          {subTitle || description || (content ? content.replace(/<[^>]*>/g, '').slice(0, 100) + '...' : '')}
        </p>
      </div>
    </div>
  )
}

export default BlogCard

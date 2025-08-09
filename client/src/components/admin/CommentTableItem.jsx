import React from 'react'
import { assets } from '../../assets/assets';

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog, createdAt, _id} = comment;
    const blogDate = new Date(createdAt);

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
        <td className='px-6 py-5 min-w-[400px]'>
            <div className='space-y-2'>
                <div>
                    <span className='font-semibold text-gray-800'>Bài viết:</span>
                    <span className='ml-2 text-gray-700'>{blog.title}</span>
                </div>
                <div>
                    <span className='font-semibold text-gray-800'>Tên:</span>
                    <span className='ml-2 text-gray-700'>{comment.name}</span>
                </div>
                <div>
                    <span className='font-semibold text-gray-800'>Bình luận:</span>
                    <span className='ml-2 text-gray-700'>{comment.content}</span>
                </div>
            </div>
        </td>
        <td className='px-6 py-5 text-gray-600 max-sm:hidden text-center whitespace-nowrap'>
            {blogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-5'>
            <div className='flex items-center justify-center gap-3'>
                {!comment.isApproved ? (
                    <img src={assets.tick_icon} className='w-6 h-6 hover:scale-110 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100' />
                ) : (
                    <span className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 font-medium whitespace-nowrap'>Đã duyệt</span>
                )}
                <img src={assets.bin_icon} className='w-6 h-6 hover:scale-110 transition-all cursor-pointer opacity-70 hover:opacity-100 p-1 rounded hover:bg-red-50' />
            </div>
        </td>
      
    </tr>
  )
}

export default CommentTableItem

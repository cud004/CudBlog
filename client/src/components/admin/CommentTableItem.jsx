import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import commentService from '../../services/commentService';

const CommentTableItem = ({comment, fetchComments}) => {
    const {blog, createdAt, _id} = comment;
    const blogDate = new Date(createdAt);
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            const response = await commentService.approveComment(_id);
            if (response.success) {
                toast.success('Duyệt bình luận thành công');
                fetchComments();
            } else {
                toast.error(response.message || 'Không thể duyệt bình luận');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await commentService.deleteComment(_id);
            if (response.success) {
                toast.success('Xóa bình luận thành công');
                fetchComments();
            } else {
                toast.error(response.message || 'Không thể xóa bình luận');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
        <td className='px-6 py-5 min-w-[400px]'>
            <div className='space-y-2'>
                <div>
                    <span className='font-semibold text-gray-800'>Bài viết:</span>
                    <span className='ml-2 text-gray-700'>{blog?.title || 'N/A'}</span>
                </div>
                <div>
                    <span className='font-semibold text-gray-800'>Tên:</span>
                    <span className='ml-2 text-gray-700'>{comment.name}</span>
                </div>
                <div>
                    <span className='font-semibold text-gray-800'>Email:</span>
                    <span className='ml-2 text-gray-700'>{comment.email}</span>
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
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className='disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <img 
                            src={assets.tick_icon} 
                            className='w-6 h-6 hover:scale-110 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100' 
                            alt="Approve"
                        />
                    </button>
                ) : (
                    <span className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 font-medium whitespace-nowrap'>Đã duyệt</span>
                )}
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className='disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <img 
                        src={assets.bin_icon} 
                        className='w-6 h-6 hover:scale-110 transition-all cursor-pointer opacity-70 hover:opacity-100 p-1 rounded hover:bg-red-50' 
                        alt="Delete"
                    />
                </button>
            </div>
        </td>
      
    </tr>
  )
}

export default CommentTableItem

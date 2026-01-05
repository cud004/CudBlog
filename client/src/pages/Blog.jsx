import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import blogService from '../services/blogService';
import commentService from '../services/commentService';

const Blog = () => {
  const {id} = useParams()

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const response = await blogService.getBlogById(id);
      console.log('Blog response:', response);
      if (response.success) {
        console.log('Blog data:', response.data);
        console.log('Image URL:', response.data.image);
        console.log('Category:', response.data.category);
        console.log('Content:', response.data.content);
        console.log('Description:', response.data.description);
        setData(response.data);
      } else {
        toast.error('Không thể tải bài viết');
      }
    } catch (error) {
      console.error('Fetch blog error:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  }
  
  const fetchComments = async () => {
    try {
      const response = await commentService.getBlogComments(id);
      if (response.success) {
        // Response có thể là { comments: [], pagination: {} }
        const commentList = response.data.comments || response.data || [];
        console.log('Comments fetched:', commentList.length);
        setComments(commentList);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !content) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await commentService.createComment({
        blog: id,
        name,
        email,
        content
      });

      if (response.success) {
        toast.success('Bình luận của bạn đã được gửi và đang chờ duyệt!');
        setName('');
        setEmail('');
        setContent('');
        // Optionally refresh comments
        fetchComments();
      } else {
        toast.error(response.message || 'Không thể gửi bình luận');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setSubmittingComment(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchBlogData(), fetchComments()]);
      setLoading(false);
    };
    loadData();
  }, [id])

  return loading ? <Loader/> : data ? (
    <>
      <Navbar />

      <div className='text-center mt-20 text-gray-700'>
        <p className='text-primary py-4 font-medium'>Đăng vào {Moment(data.createdAt).format('DD/MM/YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 leading-tight'>{data.title}</h1>
        {data.subTitle && <h2 className='my-5 max-w-lg mx-auto text-gray-600 text-lg'>{data.subTitle}</h2>}
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.author?.name || 'Admin'}
        </p>
      </div>
      
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        {/* Hiển thị ảnh nếu có */}
        {data.image && (
          <img 
            src={data.image} 
            alt={data.title} 
            className='rounded-3xl mb-8 w-full h-auto'
            onError={(e) => {
              console.error('Image failed to load:', data.image);
              e.target.style.display = 'none';
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
        )}
        
        {/* Hiển thị content HTML hoặc description */}
        {data.content ? (
          <div 
            className='rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg' 
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem'
            }}
            dangerouslySetInnerHTML={{__html: data.content}}
          />
        ) : (
          <div className='max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg'>
            <p>{data.description}</p>
          </div>
        )}
      </div>

      {/* Comment section */}
      {comments && comments.length > 0 && (
        <div className='mt-16 mb-12 max-w-3xl mx-auto'>
          <div className='border-t border-gray-200 pt-8'>
            <h3 className='text-xl font-semibold mb-6 text-gray-800'>Bình luận ({comments.length})</h3>
            <div className='flex flex-col gap-6'>
              {comments.map((item, index)=>(
                <div key={index} className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                      <span className='text-primary font-semibold'>{item.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className='font-medium text-gray-800'>{item.name}</p>
                      <p className='text-xs text-gray-500'>{Moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                    </div>
                  </div>
                  <p className='text-gray-700 leading-relaxed'>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Add comment form */}
      <div className='max-w-3xl mx-auto mt-8 mb-16'>
        <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Thêm bình luận</h3>
          <form onSubmit={addComment} className='flex flex-col gap-4'>
            <input 
              onChange={(e)=>setName(e.target.value)} 
              value={name} 
              type="text" 
              placeholder='Tên của bạn' 
              required 
              className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition-colors' 
            />
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              placeholder='Email của bạn' 
              required 
              className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition-colors' 
            />
            <textarea 
              onChange={(e)=>setContent(e.target.value)} 
              value={content} 
              placeholder='Viết bình luận của bạn...' 
              required
              className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition-colors h-32 resize-none'
            ></textarea>
            <button 
              type='submit' 
              disabled={submittingComment}
              className='bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium w-fit disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {submittingComment ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </form>
        </div>
      </div>

      <Footer/>
    </>
  ) : <Loader/>
}

export default Blog

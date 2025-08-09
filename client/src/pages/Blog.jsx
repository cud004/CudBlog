import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader';
const Blog = () => {
  const {id} = useParams()

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([])

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async ()=>{
    const data = blog_data.find((item)=> item._id === id)
    setData(data)
  }
  
  const fetchComments = async ()=>{
    setComments(comments_data)
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (name && content) {
      const comment = {
        name: name,
        content: content,
        createdAt: new Date()
      }
      setComments([...comments, comment])
      setName('')
      setContent('')
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  }, [id])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
      <Navbar />

      <div className='text-center mt-20 text-gray-700'>
        <p className='text-primary py-4 font-medium'>Đăng vào {Moment(data.createdAt).format('DD/MM/YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 leading-tight'>{data.title}</h1>
        <h2 className='my-5 max-w-lg mx-auto text-gray-600 text-lg'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6
        border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Duc Pham</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-8 w-full h-auto'/>
        <div className='rich-text max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg' 
             style={{
               lineHeight: '1.8',
               fontSize: '1.1rem'
             }}
             dangerouslySetInnerHTML={{__html: data.description}}></div>
      </div>

      {/* comment section */}
      <div className='mt-16 mb-12 max-w-3xl mx-auto'>
        <div className='border-t border-gray-200 pt-8'>
          <h3 className='text-xl font-semibold mb-6 text-gray-800'>Bình luận ({comments.length})</h3>
          <div className='flex flex-col gap-6'>
             {comments.map((item, index)=>(
              <div key={index} className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                    <img src={assets.user_icon} alt="" className='w-5 h-5'/>
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
             {/* Add comment section */}
       <div className='max-w-3xl mx-auto mt-8'>
            <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold mb-4 text-gray-800'>Thêm bình luận</h3>
              <form onSubmit = {addComment} className='flex flex-col gap-4'>
               <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Tên của bạn' required className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition-colors' />
               <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Viết bình luận của bạn...' className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition-colors h-32 resize-none'></textarea>
                <button type='submit' className='bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium w-fit'>Gửi bình luận</button>
               </form>
            </div>
       </div>
             {/* share button */}
       <div className='max-w-3xl mx-auto mt-16 mb-8'>
         <div className='border-t border-gray-200 pt-8'>
           <h3 className='text-lg font-semibold mb-4 text-gray-800'>Chia sẻ bài viết</h3>
           <div className='flex gap-4'>
             <button className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
               <img src={assets.facebook_icon} width={20} alt="Facebook" />
               <span className='text-sm font-medium'>Facebook</span>
             </button>
             <button className='flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors'>
               <img src={assets.twitter_icon} width={20} alt="Twitter" />
               <span className='text-sm font-medium'>Twitter</span>
             </button>
             <button className='flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
               <img src={assets.googleplus_icon} width={20} alt="Google+" />
               <span className='text-sm font-medium'>Google+</span>
             </button>
           </div>
         </div>
       </div>
      <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog

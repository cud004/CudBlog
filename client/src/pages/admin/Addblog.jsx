import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
const Addblog = () => {
  
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(prev => [...prev, ...files]);
  }

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  }

  const insertImageToEditor = (imageFile) => {
    if (quillRef.current && imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const range = quillRef.current.getSelection();
        quillRef.current.insertEmbed(range ? range.index : 0, 'image', imageUrl);
      };
      reader.readAsDataURL(imageFile);
    }
  }

  const generateContent = async() => {

  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
  }

  useEffect(() => {
   if(!quillRef.current && editorRef.current ){
    quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
   }
  }, [])

  return (
          <form onSubmit={onSubmitHandler} className='flex-1 bg-gray-50/50 text-gray-600 h-full overflow-scroll p-4 md:p-10'>
        <div className='bg-white w-full max-w-6xl p-6 md:p-8 shadow-lg rounded-lg'>
        <p className="text-sm font-semibold text-gray-800 mb-2"> Hình ảnh chính</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-20 w-20 rounded-lg cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors object-cover' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className="text-sm font-semibold text-gray-800 mb-2 mt-4"> Ảnh bổ sung</p>
        <label htmlFor="additionalImages">
          <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer text-center'>
            <p className='text-sm text-gray-500'>Chọn nhiều ảnh (Ctrl+Click)</p>
          </div>
          <input onChange={handleAdditionalImages} type="file" id='additionalImages' multiple hidden accept="image/*" />
        </label>
        
        {additionalImages.length > 0 && (
          <div className='mt-3 grid grid-cols-4 gap-3'>
            {additionalImages.map((img, index) => (
              <div key={index} className='relative'>
                <img src={URL.createObjectURL(img)} alt="" className='w-full h-16 object-cover rounded-lg' />
                <button 
                  type='button' 
                  onClick={() => removeAdditionalImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600'
                >
                  ×
                </button>
                <button 
                  type='button' 
                  onClick={() => insertImageToEditor(img)}
                  className='absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs py-1 rounded-b-lg hover:bg-blue-600'
                >
                  Thêm vào nội dung
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm font-semibold text-gray-800 mb-2 mt-4"> Tên bài viết</p>
        <input type="text" name="" placeholder='Nhập tên bài viết' required className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
         onChange={(e) => setTitle(e.target.value)} value={title}/>
         <p className="text-sm font-semibold text-gray-800 mb-2 mt-4"> Tiêu đề phụ</p>
        <input type="text" name="" placeholder='Nhập tiêu đề phụ' required className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
         onChange={(e) => setSubTitle(e.target.value)} value={subTitle}/>
                  <p className="text-sm font-semibold text-gray-800 mb-2 mt-4"> Mô tả</p>
         <div className='w-full h-96 pb-16 sm:pb-10 pt-2 relative border border-gray-300 rounded-lg overflow-hidden'>
          <div ref={editorRef} className="h-full"></div>
          <button type='button' onClick={generateContent} className='absolute bottom-2 right-2 text-xs text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors'>Tạo bằng AI</button>

         </div>
         
         <div className='mt-3 flex gap-2'>
          <label htmlFor="editorImage" className='px-3 py-1 bg-green-500 text-white text-xs rounded-lg cursor-pointer hover:bg-green-600 transition-colors'>
            📷 Thêm ảnh vào nội dung
          </label>
          <input 
            onChange={(e) => e.target.files[0] && insertImageToEditor(e.target.files[0])} 
            type="file" 
            id='editorImage' 
            hidden 
            accept="image/*" 
          />
         </div>
         <p className="text-sm font-semibold text-gray-800 mb-2 mt-4"> Danh mục</p>
         <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" className='mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700'>
          <option value="">Chọn danh mục</option>
          {blogCategories.map((item, index)=>{
            return <option key={index} value={item}>{item}</option>
          })}
         </select>
         <div className='flex items-center gap-3 mt-4'>
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer' />
          <p className="text-sm font-medium text-gray-800">Đăng ngay</p>
         </div>
         <button type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>Thêm bài viết</button>      </div>
    </form>
  )
}

export default Addblog

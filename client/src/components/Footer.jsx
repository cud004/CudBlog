import React from 'react'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row justify-between items-start gap-10 py-10 border-b border-gray-500/30'>
        <div>
            <div className='flex items-center'>
              <img src="/favicon.png" alt="logo" className='w-10 h-10 mr-2' />
              <span className='text-xl font-bold text-gray-800'>CudBlog</span>
            </div>
            <p className='max-w-[410px] mt-6 text-gray-700'>
                CudBlog là nơi tôi sẽ viết tất cả những gì tôi đã làm được, học tập và mọi thứ trong cuộc sống của tôi.
            </p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section, index) => (
                <div key={index}>
                    <h3 className='font-semibold text-base text-gray-800 md:mb-5 mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='text-gray-700 hover:text-gray-900 hover:underline transition-colors'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-based text-gray-600'>Copyright © 2025 CudBlog - All rights reserved.</p>
    </div>
  )
}

export default Footer

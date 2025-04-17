import React from 'react'

const ChatBox = () => {
  return (
    <div className='absolute bottom-[10%] w-[600px] h-[100px]'>
      <div className='flex flex-col justify-center items-center w-full rounded-[16px] bg-[#F4F4F5]'>
      <p className='text-[#98A2B3] font-normal text-xs leading-[16px] py-2'>Sub AI may occasionally make mistakes. Please cross-check the results for accuracy.</p>
      <div className='w-full' >
      <input type="text" placeholder='Enter prompt' className='px-4 blink text-base font-medium focus:outline-[#EEEEEE] focus:outline py-5 w-full bg-white border border-[#EEEEEE] rounded-[16px] focus:border-none' />
      </div>
      </div>
    </div>
  )
}

export default ChatBox

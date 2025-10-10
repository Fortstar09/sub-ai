"use client"
import { useUser } from '@/app/context/UserContext';
import Image from 'next/image'
import React from 'react'

const Intro = () => {
      const userContext = useUser();
      if (!userContext || !userContext.user) {
        return null;
      }
      const { user } = userContext;
  return (
    <div className='flex flex-col items-center gap-1 md:gap-5 justify-center'>
      <Image src='icon/icon.svg' alt='welcome icon' width={70} height={70} className='scale-75' />
      <div className='flex flex-col md:gap-4 items-center justify-center text-center'>
        <h2 className='font-bold text-3xl md:text-[34px] leading-[41px] text-black1 dark:text-white'>Hello {user.username}</h2>
        <p className='font-medium text-[#475367] text-lg md:text-xl md:leading-[30px]'>Which ingredient do you need a substitute for?</p>
      </div>
    </div>
  )
}

export default Intro

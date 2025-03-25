import Image from 'next/image'
import React from 'react'

const Intro = () => {
  return (
    <div className='flex flex-col items-center gap-5 justify-center'>
      <Image src='icon/icon.svg' alt='welcome icon' width={70} height={70} />
      <div className='flex flex-col gap-4 items-center justify-center text-center'>
        <h2 className='font-bold text-[34px] leading-[41px] text-black1'>Hello, Adigun</h2>
        <p className='font-medium text-[#475367] text-xl leading-[30px]'>Which ingredient do you need a substitute for?</p>
      </div>
    </div>
  )
}

export default Intro

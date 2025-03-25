import React from 'react'
import Intro from './Intro'
import PastPrompts from './PastPrompts'

const MainContent = () => {
  return (
    <section className='main flex justify-center items-center min-h-[100vh] flex-1 rounded-xl bg-white md:h-[882px]'> 
    <div className='flex flex-col gap-[82px] items-center justify-center'>
    <Intro />
    <PastPrompts />
    </div>
    </section>
  )
}

export default MainContent

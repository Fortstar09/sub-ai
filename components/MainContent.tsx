import React from 'react'
import Intro from './Intro'
import PastPrompts from './PastPrompts'
import ChatBox from './ChatBox'

const MainContent = () => {
  return (
    <section className='main flex justify-center items-start min-h-[100vh] flex-1 rounded-xl md:min-h-min'> 
    <div className='flex flex-col gap-[40px] pt-16  items-center justify-center'>
    <Intro />
    <PastPrompts />
    </div>
    <ChatBox />
    </section>
  )
}

export default MainContent

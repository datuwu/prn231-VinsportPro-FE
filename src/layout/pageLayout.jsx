'use client'
import PageSidebar from '@/components/Sidebar/sideBar'
import React from 'react'

const PageLayout = ({ children }) => {
  return (
    <div className='flex flex-row w-full mx-auto '>
      <div className='w-[30%]'>
        <PageSidebar />
      </div>
      <main className="flex h-[100vh] flex-col items-center justify-between p-10 w-full overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default PageLayout
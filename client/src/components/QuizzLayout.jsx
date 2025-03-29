import React from 'react'
import { Outlet } from 'react-router-dom'

function QuizzLayout() {
  return (
    <div className="h-screen bg-[url('/bg/bg3.png')] bg-cover bg-center w-full overflow-hidden flex flex-col ">
      <Outlet/>
    </div>
  )
}

export default QuizzLayout
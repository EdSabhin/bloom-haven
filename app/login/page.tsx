"use client"
import Footer from '@/src/components/sections/Footer'
import Login from '@/src/components/sections/Login'
import Navbar from '@/src/components/sections/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-between '>
      <Navbar />
      <Login />
      <Footer />
    </div>
  )
}

export default page
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'
import ScrollAnimation from 'react-animate-on-scroll';
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeLayout
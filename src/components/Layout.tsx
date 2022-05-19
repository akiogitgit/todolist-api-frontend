import React, { ReactNode } from 'react'
import Header from './Header'
// import Footer from './Footer'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => {
  return (
    <div className='px-[30px] pb-[50px] bg-lime-100 min-h-screen w-full overflow-hidden text-[20px]'>
      <div className='max-w-[1000px] mx-auto font-serif'>
        <Header />

        <main className='mt-10'>{props.children}</main>

        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Layout

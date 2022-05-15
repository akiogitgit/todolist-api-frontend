import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <>
      <div className='flex gap-3 mt-4'>
        <Link href='/'>index</Link>
        <div className='w-[67px] py-1 px-3 text-lg border-2 border-black bg-black text-white rounded duration-300 hover:bg-white hover:text-black cursor-pointer'>
          <Link href='/register'>登録</Link>
        </div>
        <div className='w-[100px] py-1 px-3 text-lg border-2 border-black bg-black text-white rounded duration-300 hover:bg-white hover:text-black cursor-pointer'>
          <Link href='/myPage'>マイページ</Link>
        </div>
      </div>
    </>
  )
}
export default Header

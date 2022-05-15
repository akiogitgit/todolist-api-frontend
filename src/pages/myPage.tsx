import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'

const MyPage: NextPage = () => {
  // ログインをheaderでして、sessionにでも格納して
  // 自分のuser.idを使えるようにする

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const deleteUser = (id: number) => {
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `users/${id}`)
      .then((res) => {
        console.log('delete user', res.data)
      })
  }

  const update = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    axios
      .patch(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `users/${id}`, {
        user: {
          name: name,
          password: password, //pass
          password_confirmation: passwordConfirmation,
        },
      })
      .then((res) => {
        console.log('update user', res.data)
      })
    e.preventDefault()
  }

  return (
    <Layout>
      <div>mypage</div>

      <div className='mt-4'>akio</div>
      <div>投稿一覧</div>

      <div className='mt-10'>編集</div>
      <form onSubmit={(e) => update(e, 3)}>
        <input
          type='text'
          name='name'
          placeholder='名前'
          className='border border-black'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type='password'
          name='password'
          placeholder='パスワード'
          className='border border-black'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input
          type='password'
          name='password_confirmation'
          placeholder='確認パスワード'
          className='border border-black'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br></br>
        <button type='submit'>更新</button>
      </form>

      <button
        onClick={() => deleteUser(3)}
        className='px-1 border-2 border-red-500 bg-red-500 rounded text-white font-bold duration-300 hover:bg-white hover:text-red-500 hover:scale-[1.05] hover:shadow-2xl'
      >
        ユーザーを削除
      </button>
    </Layout>
  )
}
export default MyPage

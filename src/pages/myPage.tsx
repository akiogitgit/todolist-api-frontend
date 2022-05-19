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

  const arr = [
    ['SwoXyF4QaXg', '7ovLM4aZHIY', 'bPmmMtkoluY'],
    ['kMiPW3fXo8w', 'GPKVVttPEi8', 'JYpETnCQwvw'],
    ['l5zmVV6EnA0', '1G6Ncqeo9js', 'VvFHyvQJNAs'],
  ]
  console.log(arr)

  // 多次元配列を文字列に変換
  const str = arr
    .map((v) => {
      return v.join().replace(/,/g, ' ')
    })
    .join()
  console.log('make str', str) // kMiPW3fXo8w GPKVVttPEi8,JYpETnCQwvw pxBH9BJzhgo,kMiPW3fXo8w GPKVVttPEi8,JYpETnCQwvw pxBH9BJzhgo

  // 文字列を多次元配列に変換
  const newArr = str.split(',').map((v) => {
    return v.trim().replace(/,/g, ' ').split(' ')
  })
  console.log('make newArr', newArr)

  return (
    <Layout>
      <div>mypage</div>

      <div className='mt-4'>akio</div>
      <div>投稿一覧</div>

      <div>
        {arr &&
          arr.map((v, i) => (
            <div key={i} className='flex gap-3'>
              {v.map((v2, i2) => (
                <div key={i2}>{v2}</div>
              ))}
            </div>
          ))}
        {arr.map((v, i) => (
          <div key={i}>
            <div className='flex mb-4 overflow-x-scroll'>
              {v.map((video, index) => (
                <div key={index}>
                  <iframe
                    id='player'
                    width='300'
                    height='200'
                    src={'https://www.youtube.com/embed/' + video}
                    frameBorder='0'
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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

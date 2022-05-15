import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'
const Register: NextPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL) + 'users', {
        user: {
          name: name,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      })
      .then((res) => {
        console.log('create user', res.data)
      })
      .catch((err) => {
        console.log('registration error', err)
      })
    console.log('create user')
    e.preventDefault()
  }

  return (
    <Layout>
      <Link href='/'>index</Link>
      <h1>ユーザー登録ページ</h1>

      <section>
        <form onSubmit={createUser}>
          <input
            type='text'
            name='name'
            placeholder='名前'
            className='border border-black'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder='パスワード'
            className='border border-black'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            name='password_confirmation'
            placeholder='確認パスワード'
            className='border border-black'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button type='submit'>作成</button>
        </form>
      </section>
    </Layout>
  )
}

export default Register

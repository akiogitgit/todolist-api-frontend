import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface users {
  created_at: string
  id: number
  name: string
  password_digest: string
  updated_at: string
}

interface todos {
  content: string
  created_at: string
  finished: boolean
  id: number
  importance: number
  title: string
  updated_at: string
  user_id: number
}

interface createTodo {
  content: string
  importance: number
  title: string
  user_id: number
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<users[]>([])
  const [todos, setTodos] = useState<todos[]>([])
  const [createTodos, setCreateTodos] = useState<todos[]>([])

  const getApi = async (url: string) => {
    try {
      const res = await fetch(url)
      return await res.json()
    } catch (err) {
      throw err
    }
  }
  useEffect(() => {
    // userを取得
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL) + 'users').then(
      (result) => {
        console.log('API success:', result)
        // result.map((v,i)=>{
        //   setUsers(result)
        // })
        setUsers(result)
        console.log('users: ', users)
      },
      (error) => {
        console.error('err=>', error)
      }
    )

    // todosを取得
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL) + 'todos').then(
      (result) => {
        console.log('API todo:', result)
        setTodos(result)
        console.log('todos: ', todos)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>index</div>
        <div>
          {users &&
            users.map((v, i) => (
              <ul key={i} className='my-4'>
                <li>id: {v.id}</li>
                <li>name: {v.name}</li>
                <li>create: {v.created_at}</li>
                <li>update: {v.updated_at}</li>
              </ul>
            ))}
        </div>

        <div>
          {todos &&
            todos.map((v, i) => (
              <ul key={i} className='my-4'>
                <li>id: {v.id}</li>
                <li>title: {v.title}</li>
                <li>content: {v.content}</li>
                <li>important: {v.importance}</li>
                <li>finished: {v.finished}</li>
                <li>create: {v.created_at}</li>
                <li>update: {v.updated_at}</li>
              </ul>
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
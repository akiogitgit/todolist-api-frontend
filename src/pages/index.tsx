import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../components/Layout'

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

interface CreateUsers {
  id: number
  name: string
  // password_digest: string
  password: string
  password_confirmation: string
}

interface createTodo {
  user_id: number
  title: string
  content: string
  importance: number
  finished: boolean
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<users[]>([])
  const [todos, setTodos] = useState<todos[]>([])
  // const [createTodos, setCreateTodos] = useState<todos[]>([])

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [id, setId] = useState(0) // update, delete
  const [userId, setUserId] = useState(4)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [importance, setImportance] = useState(1)
  const [finished, setFinished] = useState(false)

  // postとpatchを見分けたい
  const [method, setMethod] = useState('post')

  const getApi = async (url: string) => {
    try {
      const res = await fetch(url)
      return await res.json()
    } catch (err) {
      throw err
    }
  }

  // 再読み込みしなきゃいけないから、setTodoにも格納する
  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL) + 'todos', {
        todo: {
          user_id: userId,
          title: title,
          content: content,
          importance: importance,
          finished: finished,
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

  const deleteTodo = (id: number) => {
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `todos/${id}`)
      .then((res) => {
        console.log('delete user', res.data)
      })
  }

  const setUpdateTodo = (todo: todos) => {
    setId(todo.id)
    setUserId(todo.user_id)
    setTitle(todo.title)
    setContent(todo.content)
    setImportance(todo.importance)
    setFinished(todo.finished)
    setMethod('patch')
  }

  const updateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .patch(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `todos/${id}`, {
        todo: {
          // user_id: userId,
          title: title,
          content: content,
          importance: importance,
          finished: finished,
        },
      })
      .then((res) => {
        console.log('update user', res.data)
      })
    e.preventDefault()
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (method === 'post') {
  //     createTodo()
  //   } else {
  //     updateTodo()
  //   }
  // }

  const switchFinished = (id2: number, finished2: boolean) => {
    console.log('id:', id2, 'finished:', finished2)
  }
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>index</h1>
        <p>user_id: 4</p>
        <form
          className='bg-white mt-4 py-4 px-10 rounded-2xl shadow-lime-200 shadow-lg '
          onSubmit={(e) => (method === 'post' ? createTodo(e) : updateTodo(e))}
        >
          {/* <form onSubmit={handleSubmit}> */}
          <div className='flex flex-col text-center justify-center sm:flex-row sm:gap-4'>
            <div>
              <input
                type='text'
                name='title'
                value={title}
                placeholder='Todo名'
                required
                className='bg-white border-b-2 border-black font-serif outline-none'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mt-6 sm:mt-0'>
              <input
                type='text'
                name='content'
                value={content}
                placeholder='内容'
                className='bg-white border-b-2 border-black font-serif outline-none'
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-center items-center sm:gap-4'>
            <div className='mt-10 sm:w-[220px]'>
              <label>重要度　</label>
              <input
                type='range'
                id='volume'
                name='volume'
                min='1'
                max='3'
                value={importance}
                className='bg-black appearance-none h-0.5 hover:shadow-2xl'
                onChange={(e) => setImportance(Number(e.target.value))}
              />
              <span className='translate-x-[130px] translate-y-[-45px] block w-'>
                {importance}
              </span>
            </div>

            <div className='sm:w-[220px]'>
              {method === 'patch' && (
                <div>
                  <label htmlFor='true' className='cursor-pointer'>
                    <input
                      type='radio'
                      id='true'
                      name='finished'
                      className='mt-4'
                      checked={finished}
                      onChange={() => setFinished(true)}
                    />
                    完了
                  </label>
                  <label htmlFor='false' className='cursor-pointer'>
                    <input
                      type='radio'
                      id='false'
                      name='publish'
                      checked={!finished}
                      onChange={() => setFinished(false)}
                    />
                    未完了
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='py-1 px-3 w-[67px] text-lg border-2 border-blue-500 bg-blue-500 text-white rounded duration-300 hover:bg-white hover:text-blue-500 cursor-pointer'
            >
              {method === 'post' ? '作成' : '更新'}
            </button>
          </div>
        </form>

        {/* 編集ボタンは作らず、チェックボックスをクリックでfinishedだけ、逆にする
        　　 完了したのを、別の場所で表示してそこで削除出来るようにする */}

        <section className='mt-10'>
          <p>☐未完了</p>
          {/* todosを逆順にして表示 */}
          {todos &&
            todos
              .map((_, i, a) => a[a.length - 1 - i])
              .map(
                (v, i) =>
                  !v.finished && (
                    <div
                      key={i}
                      className='my-4 py-4 px-10 bg-white rounded-2xl'
                    >
                      <div className='flex justify-between'>
                        <h4
                          className='text-2xl'
                          onClick={() => switchFinished(v.id, v.finished)}
                        >
                          <input
                            type='checkbox'
                            checked={v.finished}
                            id='finished2'
                          />
                          <span className='ml-2'>{v.title}</span>
                        </h4>
                        <p>
                          {[...Array(v.importance)].map((v, i) => (
                            <span key={i}>☆</span>
                          ))}
                        </p>
                      </div>
                      {/* <p>{v.content}</p> くりっくしたら表示とかで */}
                      {/* <p>user_id: {v.user_id}</p> */}
                      <p className='font-mono text-sm'>
                        {v.created_at.substring(0, 10)}
                      </p>
                      {/* <button
                        onClick={() => setUpdateTodo(v)}
                        className='w-[67px] py-1 px-3 text-lg border-2 border-blue-500 bg-blue-500 text-white rounded duration-300 hover:bg-white hover:text-blue-500 cursor-pointer'
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTodo(v.id)}
                        className='w-[67px] py-1 px-3 text-lg border-2 border-red-500 bg-red-500 text-white rounded duration-300 hover:bg-white hover:text-red-500 cursor-pointer'
                      >
                        削除
                      </button> */}
                    </div>
                  )
              )}
        </section>

        <section className='mt-10'>
          <p>✅完了済み</p>
          {todos &&
            todos
              .map((_, i, a) => a[a.length - 1 - i])
              .map(
                (v, i) =>
                  v.finished && (
                    <div
                      key={i}
                      className='my-4 py-4 px-10 bg-white rounded-2xl'
                    >
                      <div className='flex justify-between'>
                        <h4
                          className='text-2xl'
                          onClick={() => switchFinished(v.id, v.finished)}
                        >
                          <input
                            type='checkbox'
                            checked={v.finished}
                            id='finished2'
                          />
                          <span className='ml-2'>{v.title}</span>
                        </h4>
                        <p>
                          {[...Array(v.importance)].map((v, i) => (
                            <span key={i}>☆</span>
                          ))}
                        </p>
                      </div>
                      {/* <p>{v.content}</p> くりっくしたら表示とかで */}
                      {/* <p>user_id: {v.user_id}</p> */}
                      <p className='font-mono text-sm'>
                        {v.created_at.substring(0, 10)}
                      </p>
                      <button
                        onClick={() => setUpdateTodo(v)}
                        className='w-[67px] py-1 px-3 text-lg border-2 border-blue-500 bg-blue-500 text-white rounded duration-300 hover:bg-white hover:text-blue-500 cursor-pointer'
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTodo(v.id)}
                        className='w-[67px] py-1 px-3 text-lg border-2 border-red-500 bg-red-500 text-white rounded duration-300 hover:bg-white hover:text-red-500 cursor-pointer'
                      >
                        削除
                      </button>
                    </div>
                  )
              )}
        </section>

        <div>
          {/* {users &&
            users.map((v, i) => (
              <ul key={i} className='my-4'>
                <li>id: {v.id}</li>
                <li>name: {v.name}</li>
                <li>create: {v.created_at}</li>
                <li>update: {v.updated_at}</li>
              </ul>
            ))} */}
        </div>
      </main>
    </Layout>
  )
}

export default Home

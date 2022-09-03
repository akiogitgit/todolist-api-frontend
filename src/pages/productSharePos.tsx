import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useId, useState } from 'react'
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

type Posts = {
  id: number
  comment: string
  url: string
  published: boolean
  evaluation: number
  user_id: number
  created_at: string
  updated_at: string
}

const ProductSharePos: NextPage = () => {
  const [posts, setPosts] = useState<Posts[]>([])

  const [token, setToken] = useState('')
  const [uid, setUid] = useState('')
  const [client, setClient] = useState('')
  const [expiry, setExpiry] = useState('')

  const [userId, setUserId] = useState('')

  // const getApi = async (url:string, headers: string) => {
  //   try {
  //     const res = await fetch(url, {
  //       headers: {
  //         'Authorization': `Token ${token}`,
  //       }
  //     })
  //     return await res.json()
  //   } catch (err) {
  //     throw err
  //   }
  // }

  useEffect(() => {
    if (sessionStorage.getItem('access-token')) {
      setToken(String(sessionStorage.getItem('access-token')))
      setClient(String(sessionStorage.getItem('client')))
      setExpiry(String(sessionStorage.getItem('expiry')))
      setUid(String(sessionStorage.getItem('uid')))

      setUserId(String(sessionStorage.getItem('userId')))
      console.log({ uid })
      console.log('useEffect!!!')
      // console.log((sessionStorage.getItem("access-token")))
      // console.log((sessionStorage.getItem("uid")))
    }
  }, [])

  const getApi = async (url: string) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`,
          'content-type': 'application/json',
          'access-token': token,
          client: client,
          expiry: expiry, // セッションが期限で無効にする
          uid: uid,
        },
      })
      return await res.json()
    } catch (err) {
      throw err
    }
  }

  const postApi = (url: string, data: object) => {
    const headers = {
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    console.log('data: ', data)
    return axios.post(
      String(process.env.NEXT_PUBLIC_DEV_API_URL2) + url,
      {
        // user: {
        //   username: 'test1 update',
        //   nickname: 'users#updateで更新されたユーザー ',
        //   password: 'password1',
        //   password_confirmation: 'password1',
        //   email: "test1@test.com"
        // },
        data,
      },
      {
        headers: headers,
      }
    )
    // .then((res) => {
    //   return res
    // })
    // .catch((err) => {
    //   return err
    // })
  }
  // post
  const createPost = () => {
    const headers = {
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'posts',
        {
          post: {
            comment: 'いいね',
            url: 'https://simple-post.vercel.app/',
            published: true,
            evaluation: 2,
            // user_id: 2
          },
        },
        { headers: headers }
      )
      .then((res) => {
        console.log('create posts', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  // post
  const updatePost = () => {
    const headers = {
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'posts/15',
        {
          post: {
            // comment: "iine",
            comment: 'iine',
            // url: "httttpppp:::::::::aaa",
            // published: true,
            // evaluation: 1,
            // user_id: 2
          },
        },
        { headers: headers }
      )
      .then((res) => {
        console.log('update posts', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const deletePost = () => {
    const headers = {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + `posts/103`, {
        headers: headers,
      })
      .then((res) => {
        console.log('delete posts', res)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const createUser2 = () => {
    const data = {
      username: 'test3',
      nickname: 'トークンがあるユーザー',
      password: 'test',
      password_confirmation: 'test',
      email: 'test@test.com',
    }
    postApi(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'auth', data)
  }

  // create posts
  const createTodo = () => {
    // ;[...Array(50)].map((v, i) => {
    // console.log('arr', i)
    axios.post(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'posts', {
      post: {
        // comment: 'いいと思いました' + i + 1,
        // url: 'https://qiita.com/vossibop/items/8f70000927a2adcc2911',
        // published: (i + 1) % 2 == 0,
        // evaluation: ((i + 1) % 5) + 1,
        // user_id: ((i + 1) % 2) + 1,
        url: 'これはURLです',
        user_id: 12345,
      },
    })
    // })
  }

  // create posts
  const onLogin = () => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'login', {
        session: {
          username: 'test3',
          password: 'test',
        },
      })
      .then((res) => {
        console.log('login', res.data)
        setToken(res.data.token)
        console.log({ token })
      })
      .catch((err) => {
        console.log('login error', err)
      })
  }

  const onLoginV1Auth = (email: string, password: string) => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'auth/sign_in', {
        email: email,
        password: password,
      })
      .then((res) => {
        setToken(res.headers['access-token'])
        setClient(res.headers['client'])
        setUid(res.headers['uid'])
        setExpiry(res.headers['expiry'])
        setUserId(res.data.data['id'])
        sessionStorage.setItem('access-token', res.headers['access-token'])
        sessionStorage.setItem('client', res.headers['client'])
        sessionStorage.setItem('uid', res.headers['uid'])
        sessionStorage.setItem('expiry', res.headers['expiry'])
        sessionStorage.setItem('userId', res.data.data['id'])

        console.log('login', res)
        console.log('token: ', res.data.data['access-token'])
      })
      .catch((err) => {
        console.log('login error', err)
      })
  }

  // username, nickname が入ってない。
  const createUserV1Auth = () => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'auth', {
        username: 'test4',
        password: 'password',
        // password_confirmation: 'password',
        email: 'test4@test.com',
      })
      .then((res) => {
        console.log('create user', res)
      })
      .catch((err) => {
        console.log('registration error', err)
      })
    console.log('create user')
  }

  // user_controller
  const createUser = () => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'users', {
        user: {
          username: 'test6',
          nickname: 'user#post',
          password: 'password',
          password_confirmation: 'password',
          email: 'test6@test.com',
        },
      })
      .then((res) => {
        console.log('create user', res.data)
      })
      .catch((err) => {
        console.log('registration error', err)
      })
    console.log('create user')
  }

  // user.id はログイン時に取得できる
  // password も変更できちゃう。どうする？
  const updateUser = () => {
    const headers = {
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      // users/1 になるから、新しくコントローラ作る？
      // .patch(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `users/1`, {
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL2) + `auth`,
        {
          username: 'test2',
          password: 'password',
          email: 'test2@test.com',
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log('update user', res.data)
      })
  }

  // headers, data の二つなら同時に入れられる
  // もう一度password入力させて、合ってたら実行させたい
  const deleteUser = () => {
    const headers = {
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      // .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL) + `users/1`, {
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + `auth`, {
        headers: headers,
      })
      .then((res) => {
        console.log('delete user', res.data)
      })
  }

  useEffect(() => {
    // posts で全部, posts/mypost で自分の投稿
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'posts').then(
      (result) => {
        console.log('post一覧:', result)
        setPosts(result.data)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // users/2 show
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'users').then(
      (result) => {
        console.log('user一覧:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // users/2 show
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'users/1').then(
      (result) => {
        console.log('user1:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // posts/2 だと、404
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL2) + 'posts/2').then(
      (result) => {
        console.log('posts1:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )

    const postAPI = () => {
      const params = {
        email: 'test2@test.com',
        password: 'password',
      }
      const res = fetch('https://share-pos.herokuapp.com/api/v1/auth/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        mode: 'cors',
      })
      return res
    }
    postAPI().then((res) => {
      console.log('postAPi res: ', res)
      console.log('postAPi res.json: ', res.json())
      console.log('postAPi: ', res.headers.entries())
      for (var pair of res.headers.entries()) {
        console.log(pair[0] + ': ' + pair[1])
      }
    })

    console.log({ token })
  }, [token, uid])

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p>本番 sharePos</p>
        <h1 className='border-black border-b-2 mb-2'>User_id: {userId}</h1>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test1@test.com', 'password')}
        >
          Login1
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test2@test.com', 'password')}
        >
          Login2
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test3@test.com', 'password')}
        >
          Login3
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test4@test.com', 'password')}
        >
          Login4
        </button>
        <br></br>
        <br></br>

        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createUser}
        >
          user#create
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createUserV1Auth}
        >
          create User
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={updateUser}
        >
          update User
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={deleteUser}
        >
          delete User
        </button>
        <br></br>
        <br></br>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createPost}
        >
          create Post
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={updatePost}
        >
          update Post
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={deletePost}
        >
          delete Post
        </button>

        <section>
          {posts &&
            posts.map((v, i) => (
              <ul key={i} className='bg-white rounded-xl my-5 py-2 px-4'>
                <li>id: {v.id}</li>
                <li>comment: {v.comment}</li>
                <li>url: {v.url}</li>
                <li>user_id: {v.user_id}</li>
                <li
                  onClick={() => deletePost(v.id)}
                  className='border cursor-pointer bg-red-100 border-red-500 p-2 inline'
                >
                  削除
                </li>
                {/* <li>published: {v.published}</li>
              <li>evaluation: {v.evaluation}</li>
              <li>created_at: {v.created_at}</li>
              <li>updated_at: {v.updated_at}</li> */}
              </ul>
            ))}
        </section>
      </main>
    </Layout>
  )
}

export default ProductSharePos

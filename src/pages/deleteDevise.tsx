import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useId, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../components/Layout'

type users = {
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

const DeleteDevise: NextPage = () => {
  const [posts, setPosts] = useState<Posts[]>([])

  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setUsername(String(sessionStorage.getItem('username')))
    }
  }, [])

  const getApi = async (url: string) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}`,
          // Authorization: `Token ajdsiofja38830`,
          'content-type': 'application/json',
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
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    console.log('data: ', data)
    return axios.post(
      String(process.env.NEXT_PUBLIC_DEV_API_URL3) + url,
      {
        data,
      },
      {
        headers: headers,
      }
    )
  }
  // post
  const createPost = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts',
        {
          post: {
            comment: '公開にする投稿2',
            url: 'https://github.com/prettier/plugin-ruby',
            published: true,
            evaluation: 1,
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
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/18',
        {
          post: {
            // comment: "iine",
            comment: 'update',
            // url: "httttpppp:::::::::aaa",
            // published: true,
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
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/12', {
        headers: headers,
      })
      .then((res) => {
        console.log('delete posts', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  // test1@test.com password1, test5@test.com password
  const onLoginV1Auth = (email: string, password: string) => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem('token', res.data.data.token)
        sessionStorage.setItem('username', res.data.data.username)
        console.log('login', res)
      })
      .catch((err) => {
        console.log('login error', err)
      })
  }

  // username, nickname が入ってない。
  const createUser = () => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'auth/sign_up', {
        // user: {
        username: 'test3',
        password: 'password',
        password_confirmation: 'password',
        email: 'test3@test.com',
        // },
      })
      .then((res) => {
        console.log('create user', res)
      })
      .catch((err) => {
        console.log('registration error', err)
      })
    console.log('create user')
  }
  // user.id はログイン時に取得できる
  const updateUser = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .put(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `users`,
        {
          username: 'test1 update',
          // nickname: 'users#updateで更新されたユーザー ',
          // password: 'password',
          // password_confirmation: 'password1',
          // email: 'test1@test.com',
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
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `users`, {
        headers: headers,
      })
      .then((res) => {
        console.log('update user', res.data)
      })
  }
  // folder追加
  const createFolder = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders',
        {
          name: '2',
        },
        { headers: headers }
      )
      .then((res) => {
        console.log('create folder', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  const updateFolder = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios // user2は 1~5, user6は6,7
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/2',
        {
          name: 'test1 folder2',
        },
        { headers: headers }
      )
      .then((res) => {
        console.log('update folder', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  const deleteFolder = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/3', {
        headers: headers,
      })
      .then((res) => {
        console.log('delete folder', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  // folderに記事を追加

  const createBookmark = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/bookmarks',
        {
          folder_id: 1,
          post_id: 14,
        },
        { headers: headers }
      )
      .then((res) => {
        console.log('create bookmark', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  const deleteBookmark = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Token ${sessionStorage.getItem('token')}`,
    }
    axios
      .delete(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/bookmarks/8',
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log('delete bookmark', res.data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const scraping = () => {
    axios
      .get(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'metas', {
        params: { url: 'https://maku.blog/p/fw7gpx7/' },
      })
      .then((res) => {
        console.log('scraping get', res)
      })
      .catch((err) => {
        console.log('registration error', err)
      })
  }

  useEffect(() => {
    // posts で全部, posts/mypost で自分の投稿
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts').then(
      (result) => {
        console.log('post 一覧:', result)
        setPosts(result.data)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // users/2 show
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'users').then(
      (result) => {
        console.log('user一覧:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // users/2 show
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'users/1').then(
      (result) => {
        console.log('user6:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // // user/me
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'users/me').then(
      (result) => {
        console.log('自分の情報:', result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // posts/2 だと、404
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/3').then(
      (result) => {
        console.log('posts5:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // folder
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders').then(
      (result) => {
        console.log('folders:', result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // folder/1
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/1').then(
      (result) => {
        console.log('folders/1:', result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )

    console.log({ token })
  }, [])

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='border-black border-b-2 mb-2'>User: {username}</h1>
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
        <br></br>
        <br></br>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createUser}
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
        <br></br>
        <br></br>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createFolder}
        >
          create Folder
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={updateFolder}
        >
          update Folder
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={deleteFolder}
        >
          delete Folder
        </button>
        <br></br>
        <br></br>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={createBookmark}
        >
          create Bookmark
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={deleteBookmark}
        >
          delete Bookmark
        </button>
        <br></br>
        <br></br>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={scraping}
        >
          get meta info
        </button>

        <section>
          {posts.length &&
            posts.map((v, i) => (
              <ul key={i} className='bg-white rounded-xl my-5 py-2 px-4'>
                <li>id: {v.id}</li>
                <li>comment: {v.comment}</li>
                <li>url: {v.url}</li>
                <li>user_id: {v.user_id}</li>
              </ul>
            ))}
        </section>
      </main>
    </Layout>
  )
}

export default DeleteDevise

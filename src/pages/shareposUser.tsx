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

const SharePosUser: NextPage = () => {
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
          // 'Authorization': `Token ${token}`,
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
      String(process.env.NEXT_PUBLIC_DEV_API_URL3) + url,
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
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts',
        {
          post: {
            comment: 'iine',
            url: 'https://simple-post.vercel.app/',
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/3',
        {
          post: {
            // comment: "iine",
            comment: 'iine11',
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
      'content-type': 'application/json',
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/3', {
        headers: headers,
      })
      .then((res) => {
        console.log('delete posts', res.data)
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
    postApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'auth', data)
  }

  // test1@test.com password1, test5@test.com password
  const onLoginV1Auth = (email: string, password: string) => {
    axios
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'auth/sign_in', {
        // email: "test1@test.com",
        // password: 'password1',
        // email: "test5@test.com",
        // password: 'password1',
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
      .post(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'auth', {
        // registration: {
        username: 'test',
        // nickname: 'nickname 入ってる？',
        password: 'password',
        password_confirmation: 'password',
        email: 'test19@test.com',
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
      // .patch(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `users/1`, {
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `auth`,
        {
          // user: {
          username: 'test5 update',
          // nickname: 'users#updateで更新されたユーザー ',
          // password: 'password',
          // password_confirmation: 'password1',
          email: 'test5@test.com',
          // },
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
      // .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `users/1`, {
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + `auth`, {
        // data: {
        //   password: 'password',
        //   email: "test1@test.com"
        // },
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders',
        {
          folder: {
            name: '作成したフォルダ！',
          },
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios // user2は 1~5, user6は6,7
      .patch(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/8',
        {
          folder: {
            name: 'update folder',
          },
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .delete(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/8', {
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
    }
    axios
      .post(
        String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'folders/bookmarks',
        {
          bookmark: {
            folder_id: 1,
            post_id: 3,
          },
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
      'access-token': token,
      client: client,
      expiry: expiry, // セッションが期限で無効にする
      uid: uid,
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
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'users/6').then(
      (result) => {
        console.log('user6:', result)
        // setPosts(result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // user/me
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'users/me').then(
      (result) => {
        console.log('自分の情報:', result)
      },
      (error) => {
        console.error('err=>', error)
      }
    )
    // posts/2 だと、404
    getApi(String(process.env.NEXT_PUBLIC_DEV_API_URL3) + 'posts/5').then(
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
  }, [token, uid])

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='border-black border-b-2 mb-2'>User_id: {userId}</h1>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test1@test.com', 'password1')}
        >
          Login1
        </button>
        <button
          className='rounded bg-blue-500 text-white py-1 px-2'
          onClick={() => onLoginV1Auth('test5@test.com', 'password1')}
        >
          Login2
        </button>
        <br></br>
        <br></br>
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
          {posts &&
            posts.map((v, i) => (
              <ul key={i} className='bg-white rounded-xl my-5 py-2 px-4'>
                <li>id: {v.id}</li>
                <li>comment: {v.comment}</li>
                <li>url: {v.url}</li>
                <li>user_id: {v.user_id}</li>
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

export default SharePosUser

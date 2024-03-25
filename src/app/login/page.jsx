"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from "next-auth/react";

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loginInProgress, setLoginInProgress] = useState(false)

   // Handle Login
   async function handleSubmit(e) {
      e.preventDefault()
      setLoginInProgress(true)

      await signIn('credentials', { email, password, callbackUrl: '/' })
      setLoginInProgress(false)


   }
   return (
      <section className='mt-8'>
         <h1 className='text-center text-primary text-4xl mb-4'>
            Login
         </h1>
         <form action="" className='block  max-w-xs mx-auto'
            onSubmit={handleSubmit}>
            <input type="email" name='email' placeholder='email'
               disabled={loginInProgress}
               onChange={e => setEmail(e.target.value)}
            />
            <input type="password" name='password' placeholder='password'
               disabled={loginInProgress}
               onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'
               disabled={loginInProgress}
            >
               Login
            </button>

            <div className='my-4 text-center  text-gray-500'>
               or login with Provider
            </div>
            <button type='button' className=' flex gap-4 justify-center'
               onClick={() => signIn('google', { callbackUrl: '/' })}>
               <Image src={'/google.png'} width={24} height={24} />
               Login  with Google
            </button>

            <div className='text-center my-4 text-gray-500} border-t pt-4'>
               Existing Account?     {' '}            <Link href={'/login'} className='underline' >Login &raquo;</Link>

            </div>
         </form>
      </section>
   )
}

"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function RegisterPage() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [creatingUser, setCreatingUser] = useState(false)
   const [userCreated, setUserCreated] = useState(false)
   const [error, setError] = useState(false)
   // handle register
   async function handleSubmit(e) {
      e.preventDefault()
      setCreatingUser(true)
      setError(false)
      setUserCreated(false)
      try {
         const response = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
         })
         if (response.ok) {
            setUserCreated(true)
         } else {
            throw error
         }
         setCreatingUser(false)

      } catch (error) {
         setCreatingUser(false)
         setError(true)
      }

   }
   return (

      <section className='mt-8'>
         <h1 className='text-center text-primary text-4xl mb-4'>
            Register
         </h1>
         {/* Created User */}
         {userCreated && (
            <div className='my-4 text-center'>
               User Created. <br />
               Now you can {' '}
               <Link href={'/login'} className='underline' >Login &raquo;</Link>
            </div>
         )
         }
         {/* ERROR */}
         {error && (
            <div className='my-4 text-center'>
               An error has ocurred. <br />
               Please try again.
            </div>
         )}
         <form action="" className='block  max-w-xs mx-auto'
            onSubmit={handleSubmit}>
            <input type="email" placeholder='email'
               disabled={creatingUser}
               onChange={e => setEmail(e.target.value)}
            />
            <input type="password" placeholder='password'
               disabled={creatingUser}
               onChange={e => setPassword(e.target.value)}
            />
            <button type='submit'
               disabled={creatingUser}
            >
               Register
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

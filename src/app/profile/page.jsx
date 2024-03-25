"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InfoBox from '../components/layout/InfoBox'
import SuccessBox from '../components/layout/SuccessBox'
import UserTabs from '../components/layout/UserTabs'
import toast from 'react-hot-toast'
import UserForm from '../components/layout/UserForm'

export default function Profile() {
   const session = useSession()
   const { status } = session
   const userData = session.data?.user
   const [user, setUser] = useState('')

   const [isAdmin, setIsAdmin] = useState(false);
   const [profileFetched, setProfileFetched] = useState(false);
   const [isLogged, setIsLogged] = useState(true)

   useEffect(() => {
      if (status === 'authenticated') {

         fetch('/api/profile').then(response => {
            response.json().then(data => {
               setUser(data)
               setIsAdmin(data.admin)
               setProfileFetched(true)
            })
         })
      } else if (status === 'unauthenticated') {
         return redirect('/login')
      }

   }, [session, status]);
   async function handleProfileInfoUpdate(ev, data) {
      ev.preventDefault()

      const savingPromise = new Promise(async (resolve, reject) => {
         const response = await fetch('/api/profile', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               ...data
            })
         })
         if (response.ok)
            resolve()
         else
            reject();
      });
      await toast.promise(savingPromise, {
         loading: 'Saving...',
         success: 'Profile saved!',
         error: 'Error',
      });

   }


   async function handleFileChange(ev) {
      ev.preventDefault()
      const files = ev.target.files
      if (files?.length === 1) {
         const data = new FormData()
         data.set('file', files[0])
         const response = await fetch('/api/upload', {
            method: 'POST',
            body: data,
         })
         const imageLink = await response.json()
         setImage(link)
      }
   }


   if (status === 'loading' || !profileFetched) {
      return 'Loading...'
   }

   if (status === 'unauthenticated') {
      return redirect('/login')
   }
   return (
      <section className='mt-8'>
         <UserTabs isAdmin={isAdmin} />


         <h1 className='text-center text-primary text-4xl mb-4'>
            Profile
         </h1>
         <div className='max-w-2xl mx-auto '>
            <UserForm user={user} onSave={handleProfileInfoUpdate} />

         </div>
      </section>
   )
}

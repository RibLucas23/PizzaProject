"use client"

import React, { useEffect, useState } from 'react'
import { UseProfile } from '../../components/hooks/UseProfile'
import UserTabs from '../../components/layout/UserTabs';
import UserForm from '../../components/layout/UserForm'
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
export default function EditUserPage() {
   const { loading, data } = UseProfile();
   const [user, setUser] = useState(null);
   const { id } = useParams()

   useEffect(() => {
      fetch('/api/users').then(res => {

         res.json().then(users => {
            const user = users.find(u => u._id === id)
            setUser(user)
         })
      })
   }, [])


   async function handleSaveButtonClick(ev, data) {
      ev.preventDefault()

      const userPromise = new Promise(async (resolve, reject) => {
         const response = fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, _id: id })
         })
         if (response)
            resolve()
         else {
            reject();
         }
      });
      await toast.promise(userPromise, {
         loading: 'Saving...',
         success: 'Profile saved!',
         error: 'An error has ocurred',
      });

   }


   if (loading) {
      return 'Loading user info...';
   }

   if (!data.admin) {
      return 'Not an admin.';
   }
   return (
      <section className=' mt-8  max-w-2xl' >
         <UserTabs isAdmin={data.admin} />
         <div className='mt-8'>
            <UserForm user={user} onSave={handleSaveButtonClick} />
         </div>
      </section>
   )
}

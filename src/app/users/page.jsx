"use client"
import React, { useEffect, useState } from 'react'
import UserTabs from '../components/layout/UserTabs'
import { UseProfile } from '../components/hooks/UseProfile'
import Link from 'next/link';

export default function UsersPage() {
   const { loading, data } = UseProfile();
   const [users, setUsers] = useState([]);
   useEffect(() => {
      fetch('/api/users').then(response => {
         response.json().then(users => {
            setUsers(users)
         })
      })
   }, []);

   if (loading) {
      return 'Loading user info...';
   }

   if (!data.admin) {
      return 'Not an admin.';
   }


   return (
      <section className=' max-w-2xl mx-auto mt-8'>
         <UserTabs isAdmin={data.admin} />
         <div>
            {users?.length > 0 && users.map(user => (
               <div key={user._id} className='bg-gray-300 rounded-lg mb-2 p-4 flex px-4 items-center gap-4'>
                  <div className='grid  grid-cols-2 md:grid-cols-3 gap-4 grow'>
                     <div className=' text-gray-900'>
                        {!!user.name && (<span>{user.name}</span>)}
                        {!user.name && (<span className=' italic'>No name</span>)}
                     </div>
                     <span className=' text-gray-500'> {user.email} </span>
                  </div>
                  <div>
                     <Link className='button' href={'/users/' + user._id}>Edit</Link>
                  </div>
               </div>

            ))}
         </div>
      </section>
   )
}

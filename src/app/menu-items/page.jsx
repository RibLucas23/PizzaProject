"use client"

import React, { useEffect, useState } from 'react'
import UserTabs from '../components/layout/UserTabs'
import { UseProfile } from '../components/hooks/UseProfile'
import Link from 'next/link'
import Right from '../components/icons/Right'
import Image from 'next/image'
export default function MenuItemsPage() {
   const { isAdmin, data: profileData } = UseProfile()
   const [menuItems, setMenuItems] = useState([])
   useEffect(() => {
      fetch('/api/menu-items').then(res => {
         res.json().then(menuItems => {
            setMenuItems(menuItems)
         })
      })
   }, [])
   return (
      <section className='mt-8  max-w-2xl mx-auto'>
         <UserTabs isAdmin={isAdmin} />

         <div className='mt-8'>
            <Link
               className='button'
               href={'/menu-items/new'}>
               Create new menu item
               <Right />
            </Link>
         </div>
         <div>
            <h2 className='text-sm text-gray-500 mt-8'> Edit menu item:</h2>
            <div className=' grid grid-cols-3 gap-2'>
               {menuItems?.length > 0 && menuItems.map(item => (
                  <Link key={item._id} href={'/menu-items/edit/' + item._id}
                     className='bg-gray-200  rounded-lg p-4 flex flex-col items-center'
                  >
                     <div className='relative '>
                        <Image
                           className='rounded-md'
                           src="/pizza.png" alt='menu item image' width={100} height={100} />
                     </div>
                     <div className='text-center'>
                        {item.name}
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   )
}

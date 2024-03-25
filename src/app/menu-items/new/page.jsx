"use client"
import React, { useState } from 'react'
import UserTabs from '../../components/layout/UserTabs'
import Link from 'next/link'
import MenuItemForm from '../../components/layout/MenuItemForm'

import { UseProfile } from '../../components/hooks/UseProfile'
import Left from '../../components/icons/Left'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export default function NewMenuItemPage() {
   const { isAdmin, data: profileData } = UseProfile()
   const [menuItem, setMenuItem] = useState(null);

   const [redirectToItems, setRedirectToItems] = useState(false);

   async function handleFormSubmit(ev, data) {
      ev.preventDefault()
      const savingPromise = new Promise(async (resolve, reject) => {
         const response = await fetch('/api/menu-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         })
         if (response.ok) {
            resolve()
         } else {
            reject()
         }
      })
      await toast.promise(savingPromise, {
         loading: 'Saving this tasty item',
         success: 'Saved',
         error: 'Error',
      });
      setRedirectToItems(true)
   }
   if (redirectToItems) {
      return redirect('/menu-items')
   }
   return (
      <section className='mt-8'>
         <UserTabs isAdmin={isAdmin} />
         <div className=' max-w-2xl mx-auto mt-8'>
            <Link href={'/menu-items'} className='button'>
               <Left />
               <span>Show all menu items</span>
            </Link>
         </div>
         <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      </section>
   )
}

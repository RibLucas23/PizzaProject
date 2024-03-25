"use client"
import React, { useEffect, useState } from 'react'
import SectionHeaders from '../components/layout/SectionHeaders';
import UserTabs from '../components/layout/UserTabs';
import { UseProfile } from '../components/hooks/UseProfile';
import { dbTimeForHuman } from './../../libs/datetime';
import Link from 'next/link';

export default function OrdersPage() {
   const [orders, setOrders] = useState([]);
   const { isAdmin, data: profileData } = UseProfile()

   useEffect(() => {
      fetch('/api/orders').then(res => {
         res.json().then(orders => {
            setOrders(orders)
         })
      })
   }, [])

   return (
      <section className=' max-w-2xl mx-auto  mt-8'>
         <UserTabs isAdmin={isAdmin} />
         <div className='text-center'>
            <SectionHeaders mainHeader={'Orders'} />
         </div>
         <div className='mt-8'>
            {orders?.length > 0 && orders.map(order => (
               <div key={order._id} className='bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-3 items-center text-sm'>
                  <div className=' text-gray-500'>
                     <div>
                        Menu items: {order.cartProducts?.length}
                     </div>
                     {order.userEmail}
                  </div>
                  <div className='text-center'>
                     <span className={
                        (order.paid ? 'bg-green-500' : 'bg-red-400')
                        + ' p-2 rounded-md text-white'
                     }>
                        {order.paid ? 'Paid' : 'Not paid'}
                     </span>
                  </div>
                  <div className='text-right'>
                     {dbTimeForHuman(order.createdAt)}
                     <Link href={'/orders/' + order._id} className='button'>
                        Show order
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </section>

   )
}

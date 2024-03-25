"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders'

export default function HomeMenu() {

   const [bestSellers, setBestSellers] = useState([])
   useEffect(() => {
      fetch('/api/menu-items').then(res => {
         res.json().then(menuItems => {
            const bestSellers = menuItems.slice(-3)
            setBestSellers(bestSellers)

         })
      })
   }, [])


   return (
      <section className=''>
         <div className='absolute left-0 right-0 w-full ' >
            <div className=' absolute  left-0 -top-[70px]  text-left -z-10  '>
               <Image src={'/sallad1.png'} width={109} height={189} alt='decorative image' />
            </div>
            <div className='h-48  absolute -top-36 right-0 -z-10'>
               <Image src={'/sallad2.png'} width={107} height={195} alt='decorative image' />
            </div>
         </div>
         <div className='text-center mb-4'>
            <SectionHeaders
               subHeader={'check out'}
               mainHeader={'Our Best Sellers'}
            />
         </div>
         <div className='grid sm:grid-cols-3 gap-4'>
            {bestSellers?.length > 0 && bestSellers.map(item => (
               <MenuItem {...item} key={item._id} />

            ))
            }


         </div>
      </section>
   )
}

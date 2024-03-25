import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

export default function Hero() {
   return (
      <section className='hero md:mt-4' >
         <div className='py-8 md:py-12  '>
            <h1 className='text-4xl font-semibold '>
               Everything <br />
               is better <br />
               with a &nbsp;
               <span className=' text-primary' >
                  Pizza
               </span>
            </h1>
            <p className='my-6 text-gray-500  text-sm'>
               Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life.
            </p>
            <div className=' flex gap-4 text-sm '>
               <button className=' bg-primary flex uppercase gap-2 text-white px-4 py-2 rounded-full items-center justify-center'>
                  Order Now
                  <Right />
               </button>
               <button className='flex border-0 gap-2 py-2 text-gray-600 font-semibold items-center'>
                  Learn More
                  <Right />
               </button>
            </div>
         </div>

         <div className=' relative hidden md:visible md:block'>
            <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt='Pizza image' />
         </div>
      </section>
   )
}

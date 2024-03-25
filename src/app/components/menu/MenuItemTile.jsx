import Image from 'next/image'
import React from 'react'
import AddToCartButton from './AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
   const {
      image, name, description, basePrice, sizes, extraIngredientPrices
   } = item

   const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0
   return (
      <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all'>
         <div className='text-center'>
            <Image src="/pizza.png" alt="Pizza" className='max-h-24 mx-auto block' width={96} height={96} />
         </div>
         <h4 className=' font-semibold my-y text-xl mb-4'>{name}</h4>
         <p className=' text-gray-500 text-sm line-clamp-3 min-h-[60px]'> {description} </p>
         <AddToCartButton
            hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
         />
      </div>
   )
}

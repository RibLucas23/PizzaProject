"use client"
import React, { useContext, useEffect, useState } from 'react'
import SectionHeaders from './../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '../components/AppContext';
import Image from 'next/image';
import Trash from './../components/icons/Trash';
import AddressForm from '../components/layout/AddressForm';
import { UseProfile } from '../components/hooks/UseProfile';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function page() {
   const { cartProducts, removeCartProduct } = useContext(CartContext)
   const [address, setAddress] = useState({})
   const { data: profileData } = UseProfile()

   useEffect(() => {
      if (profileData?.city) {
         const { phone, streetAddress, zipCode, city, country } = profileData
         const addressFromProfile = { phone, streetAddress, zipCode, city, country }
         setAddress(addressFromProfile)
      }
   }, [profileData]);


   let total = 0
   for (const p of cartProducts) {
      total += cartProductPrice(p)
   }
   function handleAddressChange(propName, value) {
      setAddress(prevAddress => {
         return { ...prevAddress, [propName]: value }
      })
   }
   async function proceedToCheckOut(ev) {
      ev.preventDefault()
      const promise = new Promise((resolve, reject) => {
         fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               address,
               cartProducts,
            }),
         }).then(async (response) => {
            if (response.ok) {
               resolve();
               window.location = await response.json();
            } else {
               reject();
            }
         });
      });

      await toast.promise(promise, {
         loading: 'Preparing your order...',
         success: 'Redirecting to payment...',
         error: 'Something went wrong... Please try again later',
      })
   }
   if (cartProducts?.length === 0) {
      return (
         <section className='mt-8 text-center'>
            <SectionHeaders mainHeader={"Cart"} />
            <p className='mt-4'>Your shopping cart is empty 😔 </p>
         </section>
      )
   }
   return (
      <section className='mt-8'>
         <div className='text-center'>
            <SectionHeaders mainHeader="Cart" />
         </div>
         <div className='grid grid-cols-2 gap-8 mt-8'>
            <div>
               {cartProducts?.length === 0 && (
                  <div>No products in yout shopping cart</div>
               )}

               {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                  <div key={cartProducts.indexOf(product)}
                     className='flex gap-4  border-b py-4 items-center'>

                     <div className=' w-24'>
                        <Image
                           className='mx-auto'
                           src="/pizza.png" alt="Pizza" width={240} height={240} />
                     </div>

                     <div className='grow'>
                        <h3 className=' font-semibold'>
                           {product.name}
                        </h3>
                        {product.size && (
                           <div className=' text-sm'>
                              Size: <span>{product.size.name}</span>
                           </div>
                        )}
                        {product.extras?.length > 0 && (
                           <div className=' text-sm text-gray-500'>
                              Extras: {product.extras.map(extra => (
                                 <div key={product.extras.indexOf(extra)}>{extra.name} ${extra.price} </div>
                              ))}
                           </div>
                        )}
                     </div>

                     <div className='text-lg font-semibold'>
                        ${cartProductPrice(product)}
                     </div>
                     <div className='ml-2'>
                        <button
                           type='button'
                           className='p-2' onClick={() => removeCartProduct(index)}>
                           <Trash />
                        </button>
                     </div>
                  </div>
               ))}
               <div className='py-2 text-right pr-16'>
                  <span className='text-gray-500'>
                     Subtotal:
                  </span>
                  <span className='text-lg font-semibold pl-2'>
                     ${total}
                  </span>
               </div>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg'>
               <h2>Checkout</h2>
               <form onSubmit={proceedToCheckOut}>
                  <AddressForm addressProp={address}
                     setAddresProp={handleAddressChange} />
                  <button type='submit'>Pay ${total}</button>
               </form>
            </div>
         </div>
      </section>
   )
}

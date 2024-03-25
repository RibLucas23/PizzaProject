import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from './MenuItemTile';
import Image from 'next/image';

export default function MenuItem(menuItem) {
   const {
      image, name, description, basePrice, sizes, extraIngredientPrices
   } = menuItem
   const { addToCart } = useContext(CartContext)
   const [showPopUp, setShowPopUp] = useState(false);
   const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
   const [selectedExtras, setSelectedExtras] = useState([]);

   function handleAddToCartButtonClick() {
      const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0
      if (hasOptions && !showPopUp) {
         setShowPopUp(true)
         return
      }
      addToCart(menuItem, selectedSize, selectedExtras)
      setShowPopUp(false)
      toast.success('Added to Cart!')


   }
   function handleExtraThingClick(ev, extraThing) {
      const checked = ev.target.checked
      if (checked) {
         setSelectedExtras(prev => [...prev, extraThing])
      } else {
         setSelectedExtras(prev => {
            return prev.filter(extra => extra.name !== extraThing.name)
         })
      }
   }
   let selectedPrice = basePrice
   if (selectedSize) {
      selectedPrice += selectedSize.price
   }
   if (selectedExtras?.length > 0) {
      for (const extra of selectedExtras) {
         selectedPrice += extra.price
      }
   }

   return (
      <>
         {showPopUp && (
            <div
               onClick={() => setShowPopUp(false)}
               className='fixed  inset-0 bg-black/80 flex items-center justify-center'>
               <div
                  onClick={ev => ev.stopPropagation()}
                  className='my-8 bg-white p-2 rounded-lg max-w-md '>
                  <div
                     className=' overflow-y-scroll p-2'
                     style={{ maxHeight: 'calc(100vh - 90px' }} >
                     <Image
                        className='mx-auto'
                        src="/pizza.png" alt="Pizza" width={300} height={200} />
                     <h2 className='text-lg text-center font-bold mb-2'> {name}</h2>
                     <p className='text-center text-gray-500 text-sm mb-2'>{description} </p>

                     {sizes?.length > 0 && (
                        <div className=' rounded-md p-2' >
                           <h3 className='text-center text-gray-700' >Pick yout size</h3>
                           {sizes.map(size => (
                              <label key={size._id} className='flex items-center gap-2 p-4 border rounded-md mb-1' >
                                 <input
                                    onClick={() => setSelectedSize(size)}
                                    checked={selectedSize?.name === size.name}
                                    type="radio"
                                    name='size' />
                                 {size.name} ${basePrice + size.price}
                              </label>
                           ))}
                        </div>
                     )}
                     {extraIngredientPrices?.length > 0 && (
                        <div className=' rounded-md p-2' >
                           <h3 className='text-center text-gray-700' >Add any extras?</h3>
                           {extraIngredientPrices.map(extraThing => (
                              <label key={extraThing._id} className='flex items-center gap-2 p-4 border rounded-md mb-1' >
                                 <input
                                    onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                                    type="checkbox"
                                    name={extraThing.name} />
                                 {extraThing.name} +${extraThing.price}
                              </label>
                           ))}
                        </div>
                     )}
                     <button
                        onClick={handleAddToCartButtonClick}
                        className='primary sticky bottom-2'
                        type='button' >
                        Add To cart ${selectedPrice}
                     </button>
                     <button
                        className='mt-2'
                        onClick={() => setShowPopUp(false)}
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}
         <MenuItemTile
            onAddToCart={handleAddToCartButtonClick}
            {...menuItem} />
      </>
   )
}

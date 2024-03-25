"use client"
import React, { useEffect, useState } from 'react'
import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

   const [isOpen, setIsOpen] = useState(false);


   function addProp() {
      setProps(oldProps => {
         return [...oldProps, { name: '', price: 0 }]
      })
   }
   function editProp(ev, index, prop) {
      const newValue = ev.target.value
      setProps(prevSizes => {
         const newSizes = [...prevSizes]
         newSizes[index][prop] = newValue
         return newSizes
      })
   }

   function removeSize(indexToRemove) {
      setProps(prev => prev.filter((value, index) => index !== indexToRemove))
   }
   return (
      <div className='bg-gray-200 p-2 rounded-md mb-2'>
         <div className=' flex items-center gap-1 '>
            <button className=' inline-flex p-1 border-0 justify-start'
               onClick={() => setIsOpen(!isOpen)}
               type='button'>
               {isOpen && (
                  <ChevronUp />
               )}
               {!isOpen && (
                  <ChevronDown />
               )}
               <span> {name}</span>
               <span>({props?.length})</span>
            </button>
         </div>
         <div className={isOpen ? 'block' : 'hidden'}>
            {props?.length > 0 && props.map((size, index) => (
               <div key={index} className='flex gap-2 items-end'>
                  <div>
                     <label>Name</label>
                     <input type="text"
                        placeholder='Size name'
                        value={size.name}
                        onChange={ev => editProp(ev, index, 'name')} />
                  </div>

                  <div>
                     <label>Extra price </label>
                     <input type="text" placeholder='Extra price'
                        value={size.price}
                        onChange={ev => editProp(ev, index, 'price')} />
                  </div>
                  <div>
                     <button type='button'
                        onClick={() => removeSize(index)}
                        className='bg-white mb-2 px-2'>
                        <Trash />
                     </button>
                  </div>
               </div>
            ))}
            <button
               type='button'
               onClick={addProp}
               className=' bg-white items-center'>
               <Plus className='w-4 h-4' />
               {addLabel}
            </button>
         </div>
      </div>
   )
}

"use client"
import React, { useEffect, useState } from 'react'
import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import MenuItemPriceProps from './MenuItemPriceProps'
export default function MenuItemForm({ onSubmit, menuItem }) {
   const [name, setName] = useState(menuItem?.name || '');
   const [description, setDescription] = useState(menuItem?.description || '');
   const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
   const [sizes, setSizes] = useState(menuItem?.sizes || []);
   const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
   const [categories, setCategories] = useState([]);
   const [category, setCategory] = useState(menuItem?.category || '');

   useEffect(() => {
      fetch('/api/categories').then(res => {
         res.json().then(categories => {
            setCategories(categories)
         })
      })
   }, [])
   return (
      <form onSubmit={ev =>
         onSubmit(ev, {
            name, description, basePrice, sizes, extraIngredientPrices, category
         })
      }
         className='mt-8 max-w-md mx-auto'>
         <div
            className="md:grid items-start gap-4"
            style={{ gridTemplateColumns: '.3fr .7fr' }}>
            <div>
               <div className='text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1'>
                  image
               </div>
               <span className='block border border-gray-300 rounded-lg p-2 text-center cursor-pointer'>Change image</span>
            </div>
            <div className='grow'>
               <label >
                  Item name
               </label>
               <input type="text"
                  value={name}
                  onChange={ev => setName(ev.target.value)} />
               <label >
                  Description
               </label>
               <input type="text"
                  value={description}
                  onChange={ev => setDescription(ev.target.value)} />
               <label >
                  Categories
               </label>
               <select value={category} onChange={(ev) => setCategory(ev.target.value)} >
                  {categories?.length > 0 && categories.map(c => (
                     <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
               </select>
               <label >
                  Base price
               </label>
               <input type="text"
                  value={basePrice}
                  onChange={ev => setBasePrice(ev.target.value)} />
               <MenuItemPriceProps name={"Sizes"}
                  addLabel={'Add item size'}
                  props={sizes}
                  setProps={setSizes}
               />
               <MenuItemPriceProps name={"Extra ingredients"}
                  addLabel={'Add ingredient prices'}
                  props={extraIngredientPrices}
                  setProps={setExtraIngredientPrices}
               />
               <button type='submit' >Save</button>
            </div>

         </div>
      </form>
   )
}

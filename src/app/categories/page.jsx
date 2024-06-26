"use client"

import React, { useEffect, useState } from 'react'
import UserTabs from '../components/layout/UserTabs'
import { redirect } from 'next/navigation';
import { UseProfile } from '../components/hooks/UseProfile'
import toast from 'react-hot-toast';
import DeleteButton from '../components/DeleteButton'

export default function CategoriesPage() {
   const { isAdmin, data: profileData } = UseProfile()

   const [categoryName, setCategoryName] = useState('')
   const [categories, setCategories] = useState([])
   const [editedCategory, setEditedCategory] = useState(null)

   useEffect(() => {
      fetchCategories()
   }, []);
   function fetchCategories() {
      fetch('/api/categories').then(res => {
         res.json().then(categories => {
            setCategories(categories)
         })
      })
   }
   async function handleCategorySubmit(ev) {
      ev.preventDefault()
      ev.preventDefault();
      const creationPromise = new Promise(async (resolve, reject) => {
         const data = { name: categoryName };
         if (editedCategory) {
            data._id = editedCategory._id;
         }
         const response = await fetch('/api/categories', {
            method: editedCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });
         setCategoryName('');
         fetchCategories();
         setEditedCategory(null);
         if (response.ok)
            resolve();
         else
            reject();
      });
      await toast.promise(creationPromise, {
         loading: editedCategory
            ? 'Updating category...'
            : 'Creating your new category...',
         success: editedCategory ? 'Category updated' : 'Category created',
         error: 'Error, sorry...',
      });
   }
   async function handleDeleteClick(_id) {
      const promise = new Promise(async (resolve, reject) => {
         const response = await fetch('/api/categories?_id=' + _id, {
            method: 'DELETE',
         });
         if (response.ok)
            resolve();
         else
            reject();
      });
      await toast.promise(promise, {
         loading: 'Deleting category...',
         success: 'Category deleted',
         error: 'Error, sorry...',
      });
      fetchCategories()
   }
   return (
      <section className='mt-8 max-w-2xl mx-auto'>
         <UserTabs isAdmin={isAdmin} />
         <form className='mt-8' onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
               <div className='grow'>
                  <label>
                     {editedCategory ? 'Update category' : "New category name"}
                     {editedCategory && (
                        <>:
                           <b>
                              {editedCategory.name}
                           </b>
                        </>
                     )}
                  </label>
                  <input type="text"
                     value={categoryName}
                     onChange={ev => setCategoryName(ev.target.value)}
                  />
               </div>
               <div className='pb-2 flex gap-2'>
                  <button type='submit'
                     className='border border-primary '>
                     {editedCategory ? 'Update' : 'Create'}
                  </button>
                  <button type='button' onClick={() => {
                     setEditedCategory(null)
                     setCategoryName('')
                  }}>Cancel</button>
               </div>
            </div>
         </form>
         <div>
            <h2 className='mt-8 text-sm text-gray-500'>
               Existing category:
            </h2>
            {categories.length > 0 && categories.map(category => (
               <div key={category._id}

                  className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'>
                  <div className='grow '>
                     {category.name}
                  </div>
                  <div className='flex gap-1'>
                     <button type='button'
                        onClick={() => {
                           setEditedCategory(category)
                           setCategoryName(category.name)
                        }}
                     >
                        Edit
                     </button>
                     <DeleteButton
                        label='Delete'
                        onDelete={() => handleDeleteClick(category._id)} />
                  </div>

               </div>

            ))}
         </div>
      </section>
   )
}

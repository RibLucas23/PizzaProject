"use client"
import React, { useState } from 'react'
import EditableImage from './EditableImage'
import { UseProfile } from '../hooks/UseProfile';
import AddressForm from './AddressForm';
export default function UserForm({ user, onSave }) {
   const [userName, setUserName] = useState(user?.name || '')
   const [image, setImage] = useState(user?.image || '');
   const [phone, setPhone] = useState(user?.phone || '');
   const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
   const [city, setCity] = useState(user?.city || '');
   const [zipCode, setZipCode] = useState(user?.zipCode || '');
   const [country, setCountry] = useState(user?.country || '');
   const [admin, setAdmin] = useState(user?.admin || false);
   const { data: loggedInUserData } = UseProfile()

   function handleAddresChange(propName, value) {
      if (propName === 'city') setCity(value)
      if (propName === 'phone') setPhone(value)
      if (propName === 'zipCode') setZipCode(value)
      if (propName === 'country') setCountry(value)
      if (propName === 'streetAddress') setStreetAddress(value)

   }
   return (
      <div className='md:flex gap-4 items-start '>
         <div>
            <div className='  p-2 rounded-lg relative max-w-[120px] '>
               <EditableImage />
            </div>
         </div>
         <form
            className=' grow'
            onSubmit={ev =>
               onSave(ev, {
                  name: userName, image, phone, streetAddress, city, country, zipCode, admin
               })}
         >
            <label >
               First and last name
            </label>
            <input type="text" placeholder='First and last name'
               value={userName} onChange={ev => setUserName(ev.target.value)}
            />
            <label >
               Email
            </label>
            <input type="email"
               value={user?.email} disabled={true}
            />
            <AddressForm
               addressProp={{ phone, streetAddress, zipCode, city, country }}
               setAddresProp={handleAddresChange}
            />
            {loggedInUserData.admin && (
               <div>
                  <label htmlFor='adminCb' className='p-2 inline-flex items-center gap-2 mb-2 '>
                     <input type="checkbox" id='adminCb' className='mr-2' value={'1'}
                        checked={admin}
                        onChange={ev => setAdmin(ev.target.checked)}
                     />
                     <span>Admin</span>
                  </label>
               </div>
            )}
            <button type='submit'>
               Save
            </button>
         </form>
      </div>
   )
}

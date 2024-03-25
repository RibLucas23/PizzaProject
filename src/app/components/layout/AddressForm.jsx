import React from 'react'

export default function AddressForm({ addressProp, setAddresProp, disabled = false }) {
   const { phone, streetAddress, zipCode, city, country } = addressProp
   return (
      <>
         <label >
            Phone number
         </label>
         <input disabled={disabled}
            type="tel" placeholder='Phone number'
            value={phone || ''} onChange={ev => setAddresProp('phone', ev.target.value)}
         />
         <label >
            Street address
         </label>
         <input disabled={disabled}
            type="text" placeholder='Street address'
            value={streetAddress || ''} onChange={ev => setAddresProp('streetAddress', ev.target.value)}
         />
         <div className='grid grid-cols-2 gap-2 '>
            <div>
               <label >
                  City
               </label>
               <input disabled={disabled}
                  type="text" placeholder='City'
                  value={city || ''} onChange={ev => setAddresProp('city', ev.target.value)}
               />
            </div>
            <div>
               <label >
                  Postal code
               </label>
               <input disabled={disabled}
                  type="text" placeholder='Postal Code'
                  value={zipCode || ''} onChange={ev => setAddresProp('zipCode', ev.target.value)}
               />
            </div>
         </div>
         <label >
            Country
         </label>
         <input type="text" placeholder='Country'
            value={country || ''} onChange={ev => setAddresProp('country', ev.target.value)}
         />

      </>
   )
}

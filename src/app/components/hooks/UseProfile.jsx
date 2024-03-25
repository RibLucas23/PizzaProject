"use client"

import React, { useEffect, useState } from 'react'
export function UseProfile() {
   const [isAdmin, setIsAdmin] = useState(false);
   const [data, setData] = useState(false)
   useEffect(() => {
      fetch('/api/profile').then(response => {
         response.json().then(data => {
            setIsAdmin(data.admin)
            setData(data)
         })
      })

   }, [])


   return { isAdmin, data }
}

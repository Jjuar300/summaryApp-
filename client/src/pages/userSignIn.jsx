import React from 'react'
import {useUser} from '@clerk/clerk-react'

export default function userSignIn() {
  const {user} = useUser() 
  const userFullname = user.fullName; 

  console.log(userFullname)
  
    return (
    <div>userSignIn</div>
  )
}

"use client"

import { signOut } from '@/lib/actions/user.actions'
import { LogOut } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const Logout = () => {

  const handleLogout = async () => {
    await signOut();

     toast("Successfully sign out")
  };

  return (
    <div onClick={handleLogout} className='cursor-pointer'>
      <LogOut size={19} />
    </div>
  )
}

export default Logout

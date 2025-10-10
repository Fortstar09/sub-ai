// app/context/UserContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  name: string
  username?: string
  email: string
}

type UserContextType = {
  user: User | null
  setUser: (user: User) => void
}

export const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

type Props = {
  user: User
  children: ReactNode
}

export function UserProvider({ user: initialUser, children }: Props) {
  const [user, setUser] = useState<User | null>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

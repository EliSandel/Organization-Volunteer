import { createContext, useState } from "react";
import React from 'react'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    return <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{children}</AuthContext.Provider>
}
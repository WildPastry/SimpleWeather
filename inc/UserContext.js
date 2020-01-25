import React from 'react'

const UserContext = React.createContext('DATA')

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
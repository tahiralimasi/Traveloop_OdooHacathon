import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)
  const addTrip = (trip) => setTrips(prev => [...prev, trip])
  const deleteTrip = (id) => setTrips(prev => prev.filter(t => t.id !== id))
  const updateTrip = (id, updatedTrip) => setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updatedTrip } : t))

  return (
    <AppContext.Provider value={{ user, login, logout, trips, addTrip, deleteTrip, updateTrip }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
"use client"

import { createContext, useContext, useState } from "react"

type LocationContextType = {
  location: string
  setLocation: (loc: string) => void
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider({ children }: { children: React.ReactNode }) {

  const [location, setLocation] = useState("Chennai")

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used inside LocationProvider")
  }
  return context
}
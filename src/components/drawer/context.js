import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const DrawerContext = createContext({})

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => setOpen(!open)
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer, openDrawer, closeDrawer }}>
      { children }
    </DrawerContext.Provider>
  )
}

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useDrawer = () => useContext(DrawerContext)


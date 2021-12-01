import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const DrawerContext = createContext({})

export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = () => setOpen(!open)

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      { children }
    </DrawerContext.Provider>
  )
}

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useDrawer = () => useContext(DrawerContext)


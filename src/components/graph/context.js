import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const GraphContext = createContext({})

const initialGraphSettings = {
  force: 100,
}

export const GraphProvider = ({ children, nodes, edges }) => {
  const [settings, setSettings] = useState(initialGraphSettings)
  return (
    <GraphContext.Provider value={{ nodes, edges, settings }}>
      { children }
    </GraphContext.Provider>
  )
}

GraphProvider.propTypes = {
  children: PropTypes.node.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
}

export const useGraph = () => useContext(GraphContext)

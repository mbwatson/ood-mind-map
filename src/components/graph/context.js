import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const GraphContext = createContext({})

const initialGraphSettings = {
  force: 100,
}

export const GraphProvider = ({ children, nodes, edges, onNodeClick }) => {
  const [settings, ] = useState(initialGraphSettings)
  
  return (
    <GraphContext.Provider value={{ nodes, edges, settings, onNodeClick }}>
      { children }
    </GraphContext.Provider>
  )
}

GraphProvider.propTypes = {
  children: PropTypes.node.isRequired,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func,
}

export const useGraph = () => useContext(GraphContext)

import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const GraphContext = createContext({})

export const GraphProvider = ({ children, nodes, edges }) => {
  
  return (
    <GraphContext.Provider value={{ nodes, edges }}>
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

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'
import { readString } from 'react-papaparse'
import testCsv from './projects-matrix.csv'

const StoreContext = createContext({ })

export const useStore = () => useContext(StoreContext)

export const StoreProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [projectManagers, setProjectManagers] = useState([])
  const [funders, setFunders] = useState([])
  const [collaborators, setCollaborators] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [csvData, ] = useState(testCsv)
  const [parsedData, setParsedData] = useState('')
  
  useEffect(() => {
    let { data } = readString(csvData, { header: true })
    setParsedData(data)

    const newProjects = [...new Set(data.map(d => d['Name']))].filter(d => !!d)
    const newProjectManagers = [...new Set(data.map(d => d['PMs']))].filter(d => !!d)
    const newFunders = [...new Set(data.map(d => d['Funder']))].filter(d => !!d)
    const newCollaborators = [...new Set(data.map(d => d['Collaborating Organization']))].filter(d => !!d)
    const newOrganizations = [...new Set([...newFunders, ...newCollaborators])]
    
    setProjects(newProjects)
    setProjectManagers(newProjectManagers)
    setFunders(newFunders)
    setCollaborators(newCollaborators)
    setOrganizations(newOrganizations)
  }, [csvData])

  return (
    <StoreContext.Provider value={{ projects, projectManagers, funders, collaborators, organizations, csvData, parsedData }}>
      { children }
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

import { useEffect, useState } from 'react'
import { GraphProvider, Graph } from '../components/graph'
import useDimensions from 'react-cool-dimensions'
import { useStore } from '../store'

const nodeColors = {
  project: 'rebeccapurple',
  projectManager: '#00abc7',
  funder: 'crimson',
  collaborator: 'slategrey',
  organization: 'darkslategrey',
}

export const GraphView = () => {
  const { projects, projectManagers, funders, collaborators, organizations, parsedData } = useStore()
  const { observe, unobserve, height, width } = useDimensions({
    onResize: () => {
      unobserve()
      observe()
    }
  })
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  useEffect(() => {
    let newNodes = []
    let newEdges = []

    const createNode = (name, type) => ({
      id: name,
      name: name,
      color: nodeColors[type],
    })
    const createEdge = (sourceID, targetID) => ({ source: sourceID, target: targetID })

    if (!projects || !projectManagers || !organizations || !funders || !collaborators) {
      return
    }

    newNodes = [...new Set([
        ...projects.map(project => createNode(project, 'project')),
        ...projectManagers.map(pm => createNode(pm, 'projectManager')),
        ...organizations.map(org => createNode(org, 'organization')),
      ])]

    projects.forEach(project => {
      const projectRows = [...parsedData.filter(row => row['Name'] === project)]
      const projectPms = [...new Set(projectRows.map(row => row['PMs']))].filter(d => !!d)
      const projectFunders = [...new Set(projectRows.map(row => row['Funder']))].filter(d => !!d)
      const projectCollaborators = [...new Set(projectRows.map(row => row['Collaborating Organization']))].filter(d => !!d)
      const relatedProjects = [...new Set(projectRows.map(row => row['Sub/Related Project']))].filter(d => !!d)

      const createProjectEdge = node => createEdge(project, node)
      
      projectPms.forEach(pm => newEdges.push(createProjectEdge(pm)))
      projectFunders.forEach(funder => newEdges.push(createProjectEdge(funder)))
      projectCollaborators.forEach(collaborator => newEdges.push(createProjectEdge(collaborator)))
      relatedProjects.forEach(relatedProject => newEdges.push(createProjectEdge(relatedProject)))
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [projects, projectManagers, organizations])

  return (
    <div ref={ observe } style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, padding: '2px' }}>
      <GraphProvider
        nodes={ nodes }
        edges={ edges }
      >
        <Graph
          height={ height }
          width={ width }
        />
      </GraphProvider>
    </div>
  )
}

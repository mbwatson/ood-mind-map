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

    newNodes = [
      ...projects.map(project => createNode(project, 'project')),
      ...projectManagers.map(pm => createNode(pm, 'projectManager')),
      ...organizations.map(org => createNode(org, 'organization')),
    ]

    projects.forEach(project => {
      const rows = [...parsedData.filter(d => d['Name'] === project)]
      const projectPms = [...new Set(rows.map(d => d['PMs']))].filter(d => !!d)
      const projectFunders = [...new Set(rows.map(d => d['Funder']))].filter(d => !!d)
      const projectCollaborators = [...new Set(rows.map(d => d['Collaborating Organization']))].filter(d => !!d)
      
      projectPms.forEach(pm => newEdges.push(createEdge(project, pm)))
      // projectFunders.forEach(funder => newEdges.push(createEdge(project, funder)))
      projectCollaborators.forEach(collaborator => newEdges.push(createEdge(project, collaborator)))
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

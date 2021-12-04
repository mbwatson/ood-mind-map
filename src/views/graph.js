import { useEffect, useState } from 'react'
import { GraphProvider, Graph } from '../components/graph'
import useDimensions from 'react-cool-dimensions'
import { useStore } from '../store'
import { Drawer, useDrawer } from '../components/drawer'

const nodeConfig = {
  project: {
    color: {
      main: '#4b0082',
      dim: '#9f6faf',
    },
    val: 8,
  },
  projectManager: {
    color: {
      main: '#6495ed',
      dim: '#bac8e5',
    },
    val: 2,
  },
  organization: {
    color: {
      main: '#2f4f4f',
      dim: '#a3aca9',
    },
    val: 5,
  },
}

export const GraphView = () => {
  const { openDrawer } = useDrawer()
  const {
    parsedData,
    projects, projectManagers, funders, collaborators, organizations,
  } = useStore()

  const { observe, unobserve, height, width } = useDimensions({
    onResize: () => {
      unobserve()
      observe()
    }
  })
  
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const handleNodeClick = node => {
    console.log(`clicked node "${ node.name }"`)
    openDrawer()
  }

  useEffect(() => {
    let newNodes = []
    let newEdges = []

    const createNode = (type, name) => ({ id: name, name: name, ...nodeConfig[type] })
    const createProjectNode = name => createNode('project', name)
    const createProjectManagerNode = name => createNode('projectManager', name)
    const createOrganizationNode = name => createNode('organization', name)

    const createEdge = (sourceID, targetID) => ({ source: sourceID, target: targetID })

    if (!projects || !projectManagers || !organizations || !funders || !collaborators) {
      return
    }

    newNodes = [...new Set([
      ...projects.map(project => createProjectNode(project)),
      ...projectManagers.map(pm => createProjectManagerNode(pm)),
      ...organizations.map(org => createOrganizationNode(org)),
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
    <div
      ref={ observe }
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
    }}>
      <GraphProvider
        nodes={ nodes }
        edges={ edges }
        onNodeClick={ handleNodeClick }
      >
        <Graph
          height={ height }
          width={ width }
        />
        <Drawer style={{ zIndex: 99 }}/>
      </GraphProvider>
    </div>
  )
}

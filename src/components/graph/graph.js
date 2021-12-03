import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useGraph } from './context'
import { NodeTooltip } from './'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ height, width }) => {
  const { nodes, edges } = useGraph()
  const [selectedNode, setSelectedNode] = useState(null)
  const [highlightedEdges, setHighlightedEdges] = useState([])

  const highlightedNodes = useMemo(() => {
    let nodeSet = new Set()
    highlightedEdges.forEach(edge => {
      nodeSet.add(edge.source.name)
      nodeSet.add(edge.target.name)
    })
    return nodeSet
  }, [highlightedEdges])

  const nodeHighlight = useCallback(({ x, y, val, name }, context) => {
    context.fillStyle = '#ffffff99'
    context.beginPath()
    context.arc(x, y, 3 * Math.sqrt(val), 0, 2 * Math.PI, false)
    context.lineWidth = selectedNode.name === name ? 6 : 1
    context.strokeStyle = '#f33'
    context.stroke()
    context.fill()
  }, [selectedNode])

  const linkColor = useCallback(edge => highlightedEdges.includes(edge) ? 'red' : '#33333366', [highlightedEdges])
  const nodeColor = useCallback(node => highlightedNodes.size ? highlightedNodes.has(node.name) ? node.color.main : node.color.dim : node.color.main, [highlightedNodes])

  const handleNodeClick = node => {
    if (selectedNode && selectedNode.name === node.name) {
      setSelectedNode(null)
      setHighlightedEdges([])
    } else {
      setSelectedNode(node)
      const incidentEdgesOut = edges.filter(edge => edge.source.name === node.name || edge.target.name === node.name)
      const incidentEdgesIn = edges.filter(edge => edge.target.name === node.name)
      setHighlightedEdges([...incidentEdgesIn, ...incidentEdgesOut])
    }
  }

  //

  if (!nodes) {
    return (
      <h4
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
        }}
      >
        Loading...
      </h4>
    )
  }

  return (
    <ForceGraph2D
      height={ height }
      width={ width }
      graphData={{ nodes: nodes, links: edges }}
      nodeVal={ node => node.val }
      nodeRelSize={ 2 }
      nodeColor={ nodeColor }
      linkColor={ linkColor }
      enableZoomPanInteraction={ true }
      enablePointerInteraction={ true }
      nodeCanvasObjectMode={ node => highlightedNodes.has(node.name) ? 'before' : undefined }
      nodeCanvasObject={ nodeHighlight }
      onNodeClick={ handleNodeClick }
      nodeLabel={ NodeTooltip }
    />
  )
}

Graph.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Graph.defaultProps = {
  height: 800,
  width: 800,
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useGraph } from './context'
import { NodeTooltip } from './'
import * as d3Force from 'd3-force'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ height, width }) => {
  const graphRef = useRef()
  const { nodes, edges, settings } = useGraph()
  const [selectedNode, setSelectedNode] = useState(null)
  const [highlightedEdges, setHighlightedEdges] = useState(new Set())

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('collide', d3Force.forceCollide(10));
      graphRef.current.d3Force('charge')
        .strength(-settings.force)
        .distanceMax(200)
    }
  }, [graphRef.current, settings])
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

  const linkColor = useCallback(edge => {
    return highlightedEdges.size
      ? highlightedEdges.has(edge)
        ? '#e22'
        : '#33333311'
    : '#33333333'
  }, [highlightedEdges])

  const nodeColor = useCallback(node => {
    return highlightedNodes.size
      ? highlightedNodes.has(node.name)
        ? node.color.main
        : node.color.dim
      : node.color.main
    }, [highlightedNodes])

  const handleNodeClick = node => {
    if (selectedNode && selectedNode.name === node.name) {
      setSelectedNode(null)
      setHighlightedEdges([])
    } else {
      setSelectedNode(node)
      const incidentEdgesOut = edges.filter(edge => edge.source.name === node.name || edge.target.name === node.name)
      const incidentEdgesIn = edges.filter(edge => edge.target.name === node.name)
      setHighlightedEdges(new Set([...incidentEdgesIn, ...incidentEdgesOut]))
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
      ref={ graphRef }
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

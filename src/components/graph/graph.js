import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useGraph } from './context'
import { NodeTooltip } from './'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ height, width }) => {
  const { nodes, edges } = useGraph()
  const [selectedNode, setSelectedNode] = useState(null)

  const nodeHighlight = useCallback(({ x, y, val }, context) => {
    context.fillStyle = '#ffffff99'
    context.beginPath()
    context.arc(x, y, 3 * Math.sqrt(val), 0, 2 * Math.PI, false)
    context.lineWidth = 2
    context.strokeStyle = '#f33'
    context.stroke()
    context.fill()
  }, [])

  const handleNodeClick = node => {
    if (selectedNode && selectedNode.name === node.name) {
      setSelectedNode(null)
    } else {
      setSelectedNode(node)
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
      linkColor="#333"
      enableZoomPanInteraction={ true }
      enablePointerInteraction={ true }
      nodeCanvasObjectMode={ node => selectedNode === node ? 'before' : undefined }
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

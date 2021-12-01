import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { useGraph } from './context'

const ForceGraph2D = loadable(() => import('./force-graph'))

export const Graph = ({ height, width }) => {
  const { nodes, edges } = useGraph()

  if (!nodes) {
    return (
      <h4 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px' }}
      >
        Loading...
      </h4>
    )
  }

  return (
    <ForceGraph2D
      height={ height }
      width={ width }
      graphData={{ nodes, links: edges }}
      nodeLabel={ node => node.name }
      nodeVal={ node => node.val }
      nodeRelSize={ 3 }
      linkColor="black"
      enableZoomPanInteraction={ true }
      enablePointerInteraction={ true }
      zoomToFit={ () => (1000, 50) }
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

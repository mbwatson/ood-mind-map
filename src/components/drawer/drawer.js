import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useDrawer } from './context'
import { Toggler } from './toggler'

import './drawer.scss'

//

export const Drawer = ({ openWidth = 300, children, drawerStyle }) => {
  const { open } = useDrawer()
  
  return (
    <Fragment>
      <div
        className="drawer"
        style={{
          width: `${ openWidth }px`,
          transform: `translateX(${ open ? 0 : '100%' })`,
          ...drawerStyle,
        }}
      >
        { children }
        <Toggler />
      </div>
    </Fragment>
  )
}

Drawer.propTypes = {
  openWidth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  drawerStyle: PropTypes.object,
}


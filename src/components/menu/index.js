import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './menu.scss'

export const Menu = ({ items }) => {
  return (
    <nav className="main-nav">
      {
        items.map(item => (
          <NavLink
            key={ `nav-${ item.text }` }
            to={ item.path }
          >
            { item.text }
          </NavLink>
        ))
      }
    </nav>
  )
}

Menu.propTypes = {
  items: PropTypes.array.isRequired,
}

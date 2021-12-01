import { PropTypes } from 'prop-types'
import { Link } from '../components/link'
import renciLogo from '../images/renci-logo-dark.png'
import './layout.scss'

//

export const Container = ({ maxWidth = '800px', children }) => {
  return (
    <div style={{ maxWidth: maxWidth, margin: 'auto' }}>
      { children }
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
}

//

export const Layout = ({ children }) => {
  return (
    <div className="app">
      <header>
        <div className="container">
          <img src={ renciLogo } height="40px" />
          <nav className="main-nav">
            <Link to="/" activeClassName="active">Data</Link>
            <Link to="/summary" activeClassName="active">Summary</Link>
            <Link to="/graph" activeClassName="active">Graph</Link>
          </nav>
        </div>
      </header>
      <main>
        { children }
      </main>
      <footer>
        <div className="container">
          &copy; 2021
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

import { PropTypes } from 'prop-types'
import { Link as ReactLink } from 'react-router-dom'
import { Icon } from './icon'

export const Link = ({ to, children, ...props }) => {
  const externalUrlPattern = new RegExp(/^https?:\/\//)
  const mailtoPattern = new RegExp(/^mailto:/)
  const match = {
    mailto: mailtoPattern.exec(to),
    http: externalUrlPattern.exec(to),
  }
  
  if (match.http) {
    return (
      <a href={ to } target="blank" rel="noopener noreferrer" { ...props }>
        { children }
        <Icon icon="externalLink" size={ 12 } margin="0 0 0 4px"/>
      </a>
    )
  }
  
  if (match.mailto) {
    return (
      <a href={ to } { ...props }>
        { children }
        <Icon icon="email" size={ 15 } fill="var(--color-renci)" margin="0 0 -4px 4px" />
      </a>
    )
  }
  
  return (
    <ReactLink to={ to } { ...props }>{ children }</ReactLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

import { useMemo } from 'react'
import { PropTypes } from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { Link } from './link'

export const Markdown = ({ src }) => {
  const componentMap = useMemo(() => ({
    a: MarkdownLink,
  }), [])

  return (
    <ReactMarkdown components={ componentMap } className="fade" key={ src.length }>
      { src }
    </ReactMarkdown>
  )
}

Markdown.propTypes = {
  src: PropTypes.string.isRequired,
}

Markdown.defaultProps = {
  src: '',
}

// Components

export const MarkdownLink = ({ href, children, ...props }) => {
  return <Link to={ href } { ...props }>{ children }</Link> 
}

MarkdownLink.propTypes = {
  node: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}


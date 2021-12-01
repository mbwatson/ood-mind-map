import { Icon } from '../icon'
import { useDrawer } from './context'
import './toggler.scss'

//

export const Toggler = () => {
  const { open, toggleDrawer } = useDrawer()
  return (
    <button onClick={ toggleDrawer } className="toggler">
      <Icon icon={ open ? 'close' : 'hamburger' } fill={ open ? 'var(--color-warning)' : 'var(--color-renci)' } />
    </button>
  )
}

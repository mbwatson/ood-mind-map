import { useStore } from '../store'

export const SummaryView = () => {
  const { projects, projectManagers, organizations } = useStore()

  return (
    <div className="container">
      <h1>Data Summary</h1>
      
      <h2>Projects</h2>

      <ul>
        {
          projects && projects.map(project => <li key={ project }>{ project }</li>)
        }
      </ul>
      
      <h2>Project Managers</h2>

      <ul>
        {
          projectManagers && projectManagers.map(pm => <li key={ pm }>{ pm }</li>)
        }
      </ul>
      
      <h2>Organizations</h2>

      <ul>
        {
          organizations && organizations.map(org => <li key={ org }>{ org }</li>)
        }
      </ul>
    </div>
  )
}

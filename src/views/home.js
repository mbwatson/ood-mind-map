import { useStore } from '../store'

export const HomeView = () => {
  const { csvData } = useStore()

  return (
    <div className="container">
      <h1>Data</h1>
    
      <textarea
        rows="35"
        style={{ width: '100%' }}
        value={ csvData }
      />

    </div>
  )
}

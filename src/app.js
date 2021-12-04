import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { GraphView, HomeView, SummaryView, NotFoundView } from './views'
import { StoreProvider } from './store'
import { DrawerProvider } from './components/drawer'

export const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <DrawerProvider>
          <Layout>
            <Routes>
              <Route path="/" element={ <HomeView /> } />
              <Route path="/summary" element={ <SummaryView /> } />
              <Route path="/graph" element={ <GraphView /> } />
              <Route path="*" element={ <NotFoundView /> } />
            </Routes>
          </Layout>
        </DrawerProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}

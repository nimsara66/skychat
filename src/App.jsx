import { Register, Login, Home } from './pages/'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
// import ParticleBackground from './components/ParticleBackground'

import './styles/_main.scss'

function App() {
  const { currentUser } = useAuthContext()
  console.log(currentUser)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }

    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

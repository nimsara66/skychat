import { Register, Login, Home } from './pages/'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import ParticleBackground from './components/ParticleBackground'

import './styles/_main.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

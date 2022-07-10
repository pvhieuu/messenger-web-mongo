import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import { accessTokenSelector } from './components/FormLogin/selectors'
import { ROUTERS } from './constants'

function App() {
  const accessToken = useSelector(accessTokenSelector)

  return (
    <Routes>
      <Route
        path={ROUTERS.login}
        element={accessToken ? <Navigate to={ROUTERS.dashboard} /> : <Login />}
      />
      <Route
        path={ROUTERS.register}
        element={
          accessToken ? <Navigate to={ROUTERS.dashboard} /> : <Register />
        }
      />
      <Route
        path={ROUTERS.dashboard}
        element={accessToken ? <Dashboard /> : <Navigate to={ROUTERS.login} />}
      />
      <Route
        path={ROUTERS.all}
        element={
          accessToken ? (
            <Navigate to={ROUTERS.dashboard} />
          ) : (
            <Navigate to={ROUTERS.login} />
          )
        }
      />
    </Routes>
  )
}

export default App

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route 
        element={
          <ProtectedRoute >
            <Layout /> 
          </ProtectedRoute>
        } 
      >
        <Route path='/' element={ <Dashboard /> } />
      </Route>
    </Routes>
  )
}

export default App;

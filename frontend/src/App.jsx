import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='/' element={
        <ProtectedRoute >
          <Layout /> 
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;

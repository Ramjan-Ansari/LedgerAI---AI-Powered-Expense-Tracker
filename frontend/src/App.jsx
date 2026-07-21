import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import Categories from './pages/Categories.jsx';
import Budgets from './pages/Budgets.jsx';
import Insights from './pages/Insights.jsx';

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/insights" element={<Insights />} />
      </Route>
    </Routes>
  )
}

export default App;

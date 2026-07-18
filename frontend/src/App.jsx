import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> } />
    </Routes>
  )
}

export default App;

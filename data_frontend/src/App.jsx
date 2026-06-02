// import { useState } from 'react'
// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './contexts/AuthContext'
// import Home from './pages/home'
// import Connexion from './pages/connexion'
// import Inscription from './pages/inscription'
// import Dashboard from './pages/dashboard'
// import Layout from './components/layout'
// import Demo from './pages/demo'
// import Evaluation from './pages/evaluation'
// import Results from './pages/resultats'
// import History from './pages/historique'
// import Settings from './pages/parametres'
// import Reports from './pages/rapports'
// import Deconnexion from './pages/deconnexion'

// import './App.css'

// function App() {
//   // const [count, setCount] = useState(0)
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/demo" element={<Demo />} />
//           <Route path="/connexion" element={<Connexion />} />
//           <Route path="/inscription" element={<Inscription />} />
//           <Route path='/evaluation' element={<Evaluation />} />
//           <Route path='/resultats' element={<Results />} />
//           <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
//           <Route path="/historique" element={<Layout><History /></Layout>} />
//           <Route path="/parametres" element={<Layout><Settings /></Layout>} />
//           <Route path="/rapports" element={<Layout><Reports /></Layout>} />
//           <Route path="/deconnexion" element={<Deconnexion />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout'

// Import des pages
import Login from './pages/connexion';
import Register from './pages/inscription';
import Dashboard from './pages/dashboard';
import Evaluation from './pages/evaluation';
import Resultats from './pages/resultats';
import Historique from './pages/historique';
import Rapports from './pages/rapports';
import Parametres from './pages/parametres';
import Demo from './pages/demo';
import Home from './pages/home';
import About from './pages/about';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/resultats" element={<Resultats />} />
            
            
            {/* Routes protégées */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                  <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            {/* <Route 
              path="/evaluation" 
              element={
                <ProtectedRoute>
                  <Evaluation />
                </ProtectedRoute>
              } 
            /> */}
            {/* <Route 
              path="/resultats" 
              element={
                <ProtectedRoute>
                  <Resultats />
                </ProtectedRoute>
              } 
            /> */}
            <Route 
              path="/historique" 
              element={
                <ProtectedRoute>
                  <Layout>
                  <Historique />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rapports" 
              element={
                <ProtectedRoute>
                  <Layout>
                  <Rapports />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/parametres" 
              element={
                <ProtectedRoute>
                  <Layout>
                  <Parametres />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Route de redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

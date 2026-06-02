import Logo from '../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className="bg-white md:px-10 py-5 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img src={Logo} alt="logo" className='w-45 hover:scale-105 transition-all' />
            </Link>

            {/* Navigation */}
            <div className="flex items-center space-x-8">
                <NavLink
                    to="/"
                    className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                >
                    Accueil
                </NavLink>
                <NavLink
                    to="/about"
                    className="text-gray-700 hover:text-sky-900 px-3 py-2 text-sm font-medium"
                >
                    À propos
                </NavLink>
                {user ? (
                    <NavLink
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                    >
                        Dashboard
                    </NavLink>
                ) : (
                    <NavLink
                        to="/evaluation"
                        className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium"
                    >
                        Demo
                    </NavLink>
                )}
            </div>

            {/* Contact et CTA */}
            <div className="flex items-center space-x-8">
                

                {/* Bouton CTA */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{user?.first_name || user?.username}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                        
                            <div className="hidden lg:flex items-center text-gray-600">
                                <span className="text-sm">
                                    (+237) 680598671
                                </span>
                            </div>
                            <Link 
                                to="/connexion"
                                className="text-gray-700 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                            >
                                Se connecter
                            </Link>
                            <Link 
                                to="/inscription"
                                className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
// components/header.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export default function Header() {
//     const { user, isAuthenticated, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const handleLogout = async () => {
//         await logout();
//         navigate('/');
//     };

//     const handleDashboardClick = (e) => {
//         if (!isAuthenticated) {
//             e.preventDefault();
//             navigate('/connexion', { state: { from: { pathname: '/dashboard' } } });
//         }
//     };

//     const isActive = (path) => {
//         return location.pathname === path ? 'text-sky-800 bg-sky-50' : 'text-gray-700 hover:text-sky-800 hover:bg-sky-50';
//     };

//     return (
//         <header className="bg-white shadow-sm border-b border-gray-200">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center py-4">
//                     {/* Logo */}
//                     <div className="flex items-center">
//                         <Link to="/" className="flex items-center">
//                             <div className="bg-sky-800 text-white p-2 rounded-lg mr-3">
//                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
//                                 </svg>
//                             </div>
//                             <span className="text-xl font-bold text-gray-900">SmartLoan</span>
//                         </Link>
//                     </div>

//                     {/* Navigation Desktop */}
//                     <nav className="hidden md:flex items-center space-x-1">
//                         <Link 
//                             to="/" 
//                             className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActive('/')}`}
//                         >
//                             Accueil
//                         </Link>

//                         {isAuthenticated ? (
//                             <>
//                                 <Link 
//                                     to="/dashboard" 
//                                     className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActive('/dashboard')}`}
//                                 >
//                                     Tableau de bord
//                                 </Link>
//                             </>
//                         ) : (
//                             <>
//                                 <Link 
//                                     to="/dashboard" 
//                                     onClick={handleDashboardClick}
//                                     className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sky-800 hover:bg-sky-50 transition duration-300"
//                                 >
//                                     Tableau de bord
//                                 </Link>
//                             </>
//                         )}
//                     </nav>

//                     {/* Actions utilisateur */}
//                     <div className="hidden md:flex items-center space-x-4">
//                         {isAuthenticated ? (
//                             <div className="flex items-center space-x-4">
//                                 {/* Menu utilisateur */}
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                         className="flex items-center space-x-2 text-gray-700 hover:text-sky-800 focus:outline-none"
//                                     >
//                                         <div className="w-8 h-8 bg-sky-800 rounded-full flex items-center justify-center">
//                                             <span className="text-white text-sm font-medium">
//                                                 {user?.first_name ? user.first_name[0] : user?.username[0]}
//                                             </span>
//                                         </div>
//                                         <span className="text-sm font-medium">
//                                             {user?.first_name || user?.username}
//                                         </span>
//                                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                         </svg>
//                                     </button>

//                                     {/* Menu déroulant */}
//                                     {isMenuOpen && (
//                                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                                             <Link 
//                                                 to="/parametres" 
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50"
//                                                 onClick={() => setIsMenuOpen(false)}
//                                             >
//                                                 Paramètres
//                                             </Link>
//                                             <button 
//                                                 onClick={() => {
//                                                     setIsMenuOpen(false);
//                                                     handleLogout();
//                                                 }}
//                                                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-50"
//                                             >
//                                                 Déconnexion
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex items-center space-x-3">
//                                 <Link 
//                                     to="/connexion"
//                                     className="text-gray-700 hover:text-sky-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//                                 >
//                                     Se connecter
//                                 </Link>
//                                 <Link 
//                                     to="/inscription"
//                                     className="bg-sky-800 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
//                                 >
//                                     S'inscrire
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

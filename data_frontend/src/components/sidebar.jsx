import { NavLink } from "react-router-dom";
import { FaCog, FaHome, FaPoll, FaUser, FaHistory } from 'react-icons/fa'
import { FaSquarePlus } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";

export default function sidebar() {
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };
    return (
        <div className="flex bg-sky-900 bg-gradient-to-r from-gray-400 to-sky-900">
            <ul className="mt-5 text-white ml-15">
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => ` ${isActive ? 'text-black' : ''}`}>
                        <FaHome className="inline-block w-6 h-6 mr-2 mb-2" />
                        Accueil
                    </NavLink>
                </li>
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        to="/evaluation"
                        className={({ isActive }) => ` ${isActive ? 'text-black' : ''}`}>
                        <FaSquarePlus className="inline-block w-6 h-6 mr-2 mb-2" />
                        Nouvelle Prediction
                    </NavLink>
                </li>
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        to="/historique"
                        className={({ isActive }) => ` ${isActive ? 'text-black' : ''}`}>
                        <FaHistory className="inline-block w-6 h-6 mr-2 mb-2" />
                        Historiques
                    </NavLink>
                </li>
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        to="/rapports"
                        className={({ isActive }) => ` ${isActive ? 'text-black' : ''}`}>
                        <FaPoll className="inline-block w-6 h-6 mr-2 mb-2" />
                        Rapports
                    </NavLink>
                </li>
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        to="/parametres"
                        className={({ isActive }) => ` ${isActive ? 'text-black' : ''}`}>
                        <FaCog className="inline-block w-6 h-6 mr-2" />
                        Parametres
                    </NavLink>
                </li>
                <li className="mb-2 px-1 rouded hover:shadow py-2">
                    <NavLink
                        onClick={handleLogout}
                        className={({ isActive }) => ` ${isActive ? 'text-white' : ''}`}>
                        <FaUser className="inline-block w-6 h-6 mr-2 mb-2" />
                        Deconnexion
                    </NavLink>
                </li>
            </ul>
        </div >
    )
}
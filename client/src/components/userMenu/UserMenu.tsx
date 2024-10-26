import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { HiOutlineUser } from 'react-icons/hi';
import { toast } from 'react-toastify';

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser) as User | null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logOut() as unknown as any);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success('Successfully logged out!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to log out. Please try again.');
        }
    };

    return (
        <div className="flex items-center space-x-4 p-2 bg-gray-100 rounded-lg shadow-md">
            {currentUser ? (
                <>
                    <HiOutlineUser className="text-blue-500 w-6 h-6" /> {/* Icons for user */}
                    <p className="text-lg text-blue-700">
                        Hello, <span className="font-semibold text-blue-800">{currentUser.name}</span>
                    </p>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
                    >
                        Log out
                    </button>
                </>
            ) : (
                <p className="text-gray-500">Please log in.</p>
            )}
        </div>
    );
};

export default UserMenu;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser) as User | null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logOut() as unknown as any);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div>
            {currentUser ? (
                <>
                    <p>Hello, {currentUser.name}</p>
                    <button onClick={handleLogout}>Log out</button>
                </>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default UserMenu;

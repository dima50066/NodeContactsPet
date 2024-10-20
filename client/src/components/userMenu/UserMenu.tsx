import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => selectUser(state)) as User | null;
    const navigate = useNavigate();

    console.log('user', user);


    const handleLogout = async () => {
        await dispatch(logOut() as unknown as any);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Hello, {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default UserMenu;

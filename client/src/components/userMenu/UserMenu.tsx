import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

interface User {
    id: string;
    name: string;
    email: string;
    subscription: string;
}

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => selectUser(state)) as User | null;

    const handleLogout = () => {
        dispatch(logOut() as unknown as any);
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

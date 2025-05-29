import React from 'react';
import Register from '../Components/Register';
import Login from '../Components/Login';

const AuthLayout = () => {
    return (
        <div>
            <Register></Register>
            <Login></Login>
        </div>
    );
};

export default AuthLayout;
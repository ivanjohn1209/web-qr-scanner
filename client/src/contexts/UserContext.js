import React from 'react';

const UserContext = React.createContext({
    user: {},
    isLoaded: false,
    setLoginData: () => { },
    removeLoginData: () => { },
});

export default UserContext;
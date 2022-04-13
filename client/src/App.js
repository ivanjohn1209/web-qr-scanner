import logo from './logo.svg';
import './App.css';
import { QrReader } from 'react-qr-reader';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoader from './components/FullScreenLoader';
import Login from './auth/Login';
import { notification } from 'antd';
import { AuthService } from './service/AuthService';
import { keys, LocalStorageUtility } from './utility/LocalStorageUtility';
import UserContext from './contexts/UserContext';
import { IsEmpty } from './utility/ToolFtc';
import PrivateRoute from './utility/PrivateRoute';
const QrScanner = lazy(() => import('./home/QrScanner'));
const RegisterStudent = lazy(() => import('./auth/RegisterStudent'));
const DashboardLayout = lazy(() => import('./dashboard/DashboardLayout'));
// const Context = React.createContext({ name: 'Default' });
function App() {
  const [state, setstate] = useState({
    user: {},
    isLoaded: false
  });

  useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = () => {
    AuthService.getSessionInfo()
      .then(res => {
        setLoginData(res);
      })
      .catch(() => {
        removeLoginData();
      });
  };
  const setLoginData = (userDM) => {
    window.user = userDM;
    window.userRef = userDM.id;
    setstate({
      ...state,
      user: userDM,
      isLoaded: true
    });
  };
  const removeLoginData = () => {
    setstate({
      ...state,
      user: {},
      isLoaded: true
    });
    window.user = {};
    window.userRef = '';
    LocalStorageUtility.deleteLocalValue(keys.token);
  };
  var user = {
    user: state.user,
    isLoaded: state.isLoaded,
    setLoginData: setLoginData,
    removeLoginData: removeLoginData,
  };
  return (
    <div className='main-app'>
      <UserContext.Provider value={user}>
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route path="/" element={<QrScanner />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/login" element={<Login />} />
            <Route path={"/dashboard/:gradeLevel"} element={<PrivateRoute><DashboardLayout /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </div>
  );
}

export default App;

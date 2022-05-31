import logo from './logo.svg';
import './App.css';
import { QrReader } from 'react-qr-reader';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import FullScreenLoader from './components/FullScreenLoader';
import Login from './auth/Login';
import { notification } from 'antd';
import { AuthService } from './service/AuthService';
import { keys, LocalStorageUtility } from './utility/LocalStorageUtility';
import UserContext from './contexts/UserContext';
import { IsEmpty } from './utility/ToolFtc';
import PrivateRoute from './utility/PrivateRoute';
import AccountList from './dashboard/AccountList';
const QrScanner = lazy(() => import('./home/QrScanner'));
const RegisterStudent = lazy(() => import('./auth/RegisterStudent'));
const DashboardLayout = lazy(() => import('./dashboard/DashboardLayout'));
const GradeTable = lazy(() => import('./dashboard/GradeTable'));
const Settings = lazy(() => import('./dashboard/Settings'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

// const Context = React.createContext({ name: 'Default' });
function App() {
  const [state, setstate] = useState({
    user: {},
    isLoaded: false
  });
  const navigate = useNavigate()
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

    console.log(userDM)
    if (userDM.role !== "scanner" && window.location.pathname === "/")
      navigate("/dashboard/grade7")
    else if (window.location.pathname === "/")
      navigate("/scan")


    setstate({
      ...state,
      user: userDM,
      isLoaded: true
    });
  };
  const removeLoginData = () => {
    navigate("/login")
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
            <Route path="/scan" element={<PrivateRoute><QrScanner /></PrivateRoute>} />
            {/* <Route path="/register-student" element={<RegisterStudent />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route path='settings' element={<Settings />} />
              <Route path='accountlist' element={<AccountList />} />
              <Route path=':gradeLevel' element={<GradeTable />} />
              <Route path="not-found" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </div>
  );
}

export default App;

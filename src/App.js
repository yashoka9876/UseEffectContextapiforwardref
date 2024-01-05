import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('loginId')==='1'){
      setIsLoggedIn(true);
    }
  },[])

  const loginHandler = (email, password,collegeName) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('loginId','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('loginId','0');
  };

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn:isLoggedIn
      }
    }>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;

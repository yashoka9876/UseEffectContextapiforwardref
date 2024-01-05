import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {
  const ctx=useContext(AuthContext)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(()=>{
  //   if(localStorage.getItem('loginId')==='1'){
  //     setIsLoggedIn(true);
  //   }
  // },[])

  // const loginHandler = (email, password,collegeName) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('loginId','1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('loginId','0');
  // };

  return (
    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home  />}
      </main>
    </React.Fragment>
  );
}

export default App;

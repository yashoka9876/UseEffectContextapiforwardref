import React, { useState,useEffect } from "react";

const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:()=>{}
})

export const AuthContextProvider=(props)=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    
  useEffect(()=>{
    if(localStorage.getItem('loginId')==='1'){
      setIsLoggedIn(true);
    }
  },[])

    const logoutHandler = ()=>{
        setIsLoggedIn(false);
        localStorage.setItem('loginId','0');
    }

    const loginHandler=()=>{
        setIsLoggedIn(true);
        localStorage.setItem('loginId','1');
    }
    return <AuthContext.Provider 
    value={{
        isLoggedIn:isLoggedIn,
        onlogin:loginHandler,
        onlogout:logoutHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
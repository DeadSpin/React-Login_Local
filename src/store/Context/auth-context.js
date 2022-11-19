import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogIn: () => {}
})

export const AuthContextProvider = props => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>{
    const checkLoggedIn = localStorage.getItem('loggedIn')
    if(checkLoggedIn === '1')
      setIsLoggedIn(true)
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', '1')
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogIn: loginHandler }} >
      { props.children }
    </AuthContext.Provider> 
  )
}

export default AuthContext
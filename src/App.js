import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/Context/auth-context';

function App() {

  const ctxData = useContext(AuthContext)

  // You cannot use context data inside contextProvider
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctxData.isLoggedIn && <Login />}
        {ctxData.isLoggedIn && <Home  />}
      </main>
    </React.Fragment>
  );
}

export default App;

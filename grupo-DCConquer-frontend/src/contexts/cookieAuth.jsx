import {
  createContext, useState, useEffect, useMemo,
} from 'react';
import Cookies from 'js-cookie';

export const cookieAuth = createContext();

function CookieAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);

  const handleUserLogin = () => {
    const session = Cookies.get('koa.sess');
    console.log(`koa.sess ${session}`);
    if (session) {
      setCurrentUser(true);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(false);
    Cookies.remove('koa.sess');
    Cookies.remove('koa.sess.sig');
  };

  useEffect(() => {
    handleUserLogin();
  }, [currentUser, handleUserLogin, handleUserLogout]);

  const userStatus = useMemo(
    () => ({ currentUser, handleUserLogin, handleUserLogout }),
    [currentUser, handleUserLogin, handleUserLogout],
  );

  return (
    <cookieAuth.Provider value={userStatus}>{children}</cookieAuth.Provider>
  );
}
export default CookieAuthProvider;

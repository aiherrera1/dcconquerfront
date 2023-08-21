import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/styles/navbar.css';
import useCookieAuth from '../hooks/useCookieAuth';
import useTokenAuth from '../hooks/useTokenAuth';
import { SERVER_URL } from '../App';

function Navbar() {
  const { currentUser, handleUserLogout } = useCookieAuth();
  const { currentMatches } = useTokenAuth();
  const [admin, setAdmin] = useState(false);
  const [playerId, setPlayerId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/admin`;

        const { data: response } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        setPlayerId(response.playerId);
        if (response.admin) {
          setAdmin(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="topnav">
      <div className="home">
        <img src={require('../assets/images/logo.png')} alt="logo" />
        <a href="/">DCConquer</a>
      </div>
      <div className="about">
        <a href="/about">About</a>
        <a href="/rules">Rules</a>
        <a href="/ranking">Ranking</a>
        <a href="/documentation">Documentation</a>
      </div>
      <div className="session">
        {currentMatches ? (
          <div>
            {admin ? <a href="/admin_player">Admin Links</a> : <></>}
            {/* <button className="Button" onClick={logout}> */}

            <a href={`/profile/${playerId}`}>Profile</a>
          </div>
        ) : (
          <div>
            <a href="/login">Log In</a>
            <a href="/registration">Sign Up</a>
            {/* <a href="/" onClick={logout}>Logout</a> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

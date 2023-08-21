import React from 'react';
import Navbar from './Navbar';
import '../assets/styles/index.css';
import useCookieAuth from '../hooks/useCookieAuth';
import useTokenAuth from '../hooks/useTokenAuth';

function Index() {
  const { currentUser, handleUserLogout } = useCookieAuth();
  const { currentMatches } = useTokenAuth();

  return (
    <body className="index">
      <Navbar />

      <div className="background">
        <div className="home-image">
          <img src={require('../assets/images/logo.png')} alt="logo" />
        </div>
        {!currentMatches ? (
          <></>
        ) : (
          <div class="join-watch">
            <a href="/create_match">Create New Match</a>
            <a href="/available_matches">Join Match</a>
            {/* <a href="/match">Espectate Match</a> */}
          </div>
        )}

        <div className="message">
          <p>DARE TO CONQUER ALL TERRITORIES IN DCCONQUER</p>
        </div>
      </div>
    </body>
  );
}

export default Index;

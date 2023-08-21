import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/profile.css';
import useCookieAuth from '../hooks/useCookieAuth';
import useTokenAuth from '../hooks/useTokenAuth';
import { SERVER_URL } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const { currentUser, handleUserLogout } = useCookieAuth();
  const { handleTokenChange } = useTokenAuth();
  const [player, setPlayer] = useState({ avatar: 'fill_image.png' });
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState();
  const [host, setHost] = useState(false);
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/players/${id}`;
        const data = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        console.log(data['data'].playerId, data['data'].player.id);
        setMatches(data['data'].player.matches);
        console.log(data['data'].player.matches);
        if (data['data'].player.id === data['data'].playerId) {
          setMyProfile(true);
        }
        setPlayer(data['data'].player);
      } catch (error) {
        await handleTokenChange('token', 'logout');
        await handleUserLogout();
        navigate('/');

        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    await axios
      .post(`${SERVER_URL}/auth/logout`)
      .then(() => {
        console.log('Logout was succesful');
      })
      .catch((err) => {
        console.log(err);
      });
    await handleTokenChange('token', 'logout');
    await handleUserLogout();

    window.location.replace('/');
  };

  function illuminateMatch(match) {
    let matches = document.getElementsByClassName('match lightened-match');

    for (let i = 0; i < matches.length; i += 1) {
      matches[i].className = 'match';
    }

    if (document.getElementById(match.game.id).className == 'match') {
      document.getElementById(match.game.id).className =
        'match lightened-match';
      setSelected(match.game.id);
      setActive(match.game.active);
      if (match.game.host_id === player.id) {
        setHost(true);
      }
    } else {
      document.getElementById(match.game.id).className = 'match';
    }
  }

  return (
    <div className="profile-style">
      <Navbar />
      <div className="background">
        <div className="container">
          <img
            src={require(`../assets/images/avatars/${player.avatar}`)}
            alt={`${player.avatar.slice(0, -4)} avatar img`}
            id="profile"
          />
          <h2>{player.username}</h2>
          <p>Email: {player.email}</p>
          <p>Games Won: {player.gamesWon}</p>
        </div>
        {matches.length !== 0 && myProfile ? (
          <div className="box">
            {matches.map((match) => (
              <div
                id={match.game.id}
                className="match"
                onClick={() => illuminateMatch(match)}
              >
                <p>{match.game.name}</p>
                {match.game.winner_id !== -1 ? (
                  <p>Game Ended</p>
                ) : match.game.active ? (
                  <p>In Game</p>
                ) : (
                  <p>In Waiting Room</p>
                )}
                {match.game.host_id === parseInt(id) ? <p>(Host)</p> : <></>}
                <img
                  src={require('../assets/images/join_match.png')}
                  alt="Warriors Heads"
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        {selected ? (
          <div className="continue">
            {active ? (
              <a href={`/match/${selected}`}>Continue</a>
            ) : host ? (
              <a href={`/waiting_room_host/${selected}`}>Continue</a>
            ) : (
              <a href={`/waiting_room/${selected}`}>Continue</a>
            )}
          </div>
        ) : (
          <></>
        )}

        <br />
        {myProfile ? (
          <button className="button glow-button" onClick={logout}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Profile;

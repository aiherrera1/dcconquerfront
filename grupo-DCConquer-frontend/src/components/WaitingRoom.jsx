import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { SERVER_URL } from '../App';
import '../assets/styles/waiting_room.css';
import { useParams } from 'react-router-dom';

function Waiting_room() {
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState();
  const { id } = useParams();
  const [matchName, setMatchName] = useState('');
  const [inMatch, setInMatch] = useState(false);
  const [request, setRequest] = useState(false);
  const [active, setActive] = useState(false);
  const [playerId, setPlayerId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/requests/${id}`;

        const { data: response } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        setData(response);
        setMatchName(response['match'].game.name);
        setPlayers(response['match'].players);
        setHost(response['match'].game.host_id);
        setActive(response['match'].game.active);
        setPlayerId(response['player'].id);
        for (let i = 0; i < response['match'].players.length; i++) {
          const player = response['match'].players[i];
          if (player.id === response['player'].id) {
            setInMatch(true);
          }
        }
        for (let i = 0; i < response['requests'].length; i++) {
          const req = response['requests'][i];
          if (req.player.id === response['player'].id) {
            setRequest(true);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  async function leaveGame(player_id) {
    console.log(player_id, id);
    const url = `${SERVER_URL}/playersmatch/${id}`;
    const body = {
      match_id: id,
      player_id: player_id,
    };
    await axios
      .delete(`${url}/players/${player_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
    // navigate(`/waiting_room_host/${id}`);
    window.location.reload(false);
  }

  return (
    <div className="wr-style">
      <Navbar />
      <div className="background">
        <div className="page">
          <div className="label">
            <p>
              {inMatch
                ? 'Waiting For Host to start the match'
                : request
                ? 'Waiting for Host to let you in...'
                : 'You do not have a request for this match or the host rejected you'}
            </p>
          </div>
          <div className="box">
            <div className="match-name">
              <p>Match Name: {matchName}</p>
            </div>
            {players.map((player) => (
              <div className="player">
                <img
                  src={require(`../assets/images/avatars/${player.avatar}`)}
                  alt={player.avatar}
                />
                <p>
                  {host === player.id
                    ? `${player.username} (Host)`
                    : playerId === player.id
                    ? `${player.username} (You)`
                    : player.username}
                </p>
                {player.id === playerId ? (
                  <a
                    className="leave"
                    href={`/available_matches`}
                    onClick={() => leaveGame(player.id)}
                    // href={`/available_matches`}
                  >
                    Leave Game
                  </a>
                ) : (
                  <p className="leave">Connected</p>
                )}
              </div>
            ))}
          </div>
          {active ? (
            <a className="continue" href={`/match/${id}`}>
              Go to Game
            </a>
          ) : (
            <a className="continue" href="/available_matches">
              Go Back
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Waiting_room;

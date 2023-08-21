import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { SERVER_URL } from '../App';
import '../assets/styles/waiting_room_host.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function WaitingRoomHost() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [matchName, setMatchName] = useState('');
  const { id } = useParams();
  const [playerId, setPlayerId] = useState();
  const [minPlayers, setMinPlayers] = useState();

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
        setPlayers(response['match'].players);
        setMatchName(response['match'].game.name);
        setRequests(response['requests']);
        setPlayerId(response['match'].game.host_id);
        setMinPlayers(response['match'].game.min_players);
        // setHostId(response['match'].game.host_id);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  async function startGame() {
    const url = `${SERVER_URL}/matches/${id}`;
    let body = 'hola';
    await axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = `/match/${id}`;
        }
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  }

  async function addUser(player_id) {
    //console.log(player_id, id);
    const body = {
      match_id: id,
      player_id: player_id,
    };
    await axios
      .post(`${SERVER_URL}/playersmatch/${id}`, body, {
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
    //console.log(body);
    await axios
      .delete(`${SERVER_URL}/requests/${id}/players/${player_id}`, {
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

  async function rejectUser(player_id) {
    //console.log(player_id, id);
    const url = `${SERVER_URL}/requests/${id}`;
    // const body = {
    //   match_id: id,
    //   player_id: player_id,
    // };
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

  async function KickoutUser(player_id) {
    console.log(player_id, id);
    const url = `${SERVER_URL}/playersmatch/${id}`;
    // const body = {
    //   match_id: id,
    //   player_id: player_id,
    // };
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
    <div className="wra-style">
      <Navbar />
      <div className="background">
        <div className="page">
          <div className="label">
            <p>Waiting For Players To Join...</p>
          </div>
          <div className="box">
            <p>Match Name: {matchName}</p>
            {players.map((player) => (
              <div className="player">
                <img
                  src={require(`../assets/images/avatars/${player.avatar}`)}
                  alt="aztecs profile"
                />
                <div className="action">
                  {player.id === playerId ? (
                    <button>Leave Game</button>
                  ) : (
                    <button
                      onClick={() => KickoutUser(player.id)}
                      href={`/waiting_room_host/${id}`}
                    >
                      Kick Out
                    </button>
                  )}
                </div>
                <p>{player.username}</p>
              </div>
            ))}
            {requests.map((request) => (
              <div className="player">
                <img
                  src={require(`../assets/images/avatars/${request.player.avatar}`)}
                  alt={request.player.avatar}
                />
                <div className="action">
                  <button
                    id="accept"
                    className="request"
                    onClick={() => addUser(request.player.id)}
                    href={`/waiting_room_host/${id}`}
                  >
                    Accept
                  </button>
                  <button
                    id="reject"
                    className="request"
                    onClick={() => rejectUser(request.player.id)}
                    href={`/waiting_room_host/${id}`}
                  >
                    Reject
                  </button>
                </div>
                <p>{request.player.username} is trying to join...</p>
              </div>
            ))}
          </div>
          {players.map((player) => (
            <div>
              {players.length >= minPlayers && player.id === playerId ? (
                <button className="options" onClick={startGame}>
                  Start
                </button>
              ) : (
                <div></div>
              )}
            </div>
          ))}
          {players.map((player) => (
            <div>
              {players.length < minPlayers && player.id === playerId ? (
                <button className="options">Cannot start yet...</button>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoomHost;

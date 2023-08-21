import React, { useEffect, useState } from 'react';
import '../assets/styles/admin.css';
import axios from 'axios';
import { SERVER_URL } from '../App';
import { useNavigate } from 'react-router-dom';

function LinksAdmin(props) {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/players`;
        const { data: response } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        setPlayers(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
        navigate('/error');
      }
    };

    fetchData();
  }, []);

  async function backUpPlayers() {
    const url = `https://dcconquer-backup.herokuapp.com`;
    console.log(players);
    console.log(process.env.HEROKU_BACKUP);
    await axios
      .post(`${url}/backup`, players)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          alert('Players were succesfully backed up');
        }
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  }

  return (
    <div className="admin-links">
      <button onClick={() => backUpPlayers()}>Back Up</button>
      <div className="links">
        <a href="/admin_player">Players</a>
        <a href="/admin_game_match">Games & Matches</a>
        <a href="/admin_players_match">Players In Match</a>
        <a href="/admin_requests"> Requests</a>
      </div>
      <div className="title">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export default LinksAdmin;

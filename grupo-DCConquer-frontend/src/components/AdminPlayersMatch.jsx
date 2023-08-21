import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LinksAdmin from './LinksAdmin';
import { SERVER_URL } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/admin.css';

function AdminPlayersMatch() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
        if (!response.admin) {
          navigate('/error');
        }
      } catch (error) {
        console.error(error.message);
        navigate('/error');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/playersmatch`;
        const { data: response } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
        navigate('/error');
      }
    };

    fetchData();
  }, []);

  async function deletePlayerMatch(player_id, match_id) {
    const url = `${SERVER_URL}`;
    await axios
      .delete(`${url}/playersmatch/${match_id}/players/${player_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          window.location.href = '/admin_players_match';
        }
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  }
  return (
    <div className="admin-style">
      <Navbar />
      <div className="background">
        <LinksAdmin title="Players In Match" />

        <div>
          <table>
            <thead>
              <tr>
                <th>Match Id</th>
                <th>Player Id</th>
                <th>Walll Cards</th>
                <th>Ship Cards</th>
                <th>Dice Cards</th>
                <th>Warriors</th>
                <th>Turn</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((player) => (
                <tr>
                  <td>{player.match_id}</td>
                  <td>{player.player_id}</td>
                  <td>{player.wall_cards}</td>
                  <td>{player.ship_cards}</td>
                  <td>{player.dice_cards}</td>
                  <td>{player.warriors}</td>
                  <td>{player.turn}</td>
                  <td>{player.createdAt}</td>
                  <td>
                    <button
                      onClick={() =>
                        deletePlayerMatch(player.player_id, player.match_id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPlayersMatch;

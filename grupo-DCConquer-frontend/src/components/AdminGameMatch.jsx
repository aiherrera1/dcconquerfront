import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LinksAdmin from './LinksAdmin';
import { SERVER_URL } from '../App';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../assets/styles/admin.css';

function AdminGameMatch() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${SERVER_URL}/games`;
        const { data: response } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        });
        setData(response);
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

  async function deleteGame(game_id) {
    const url = `${SERVER_URL}`;
    await axios.delete(`${url}/games/${game_id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('matches'))}`,
      },
    });

    window.location.href = '/admin_game_match';
  }
  return (
    <div className="admin-style">
      <Navbar />
      <div className="background">
        <LinksAdmin title="Games & Match" />
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Host Id</th>
                <th>Name</th>
                <th>Min Players</th>
                <th>Max Players</th>
                <th>Starting Cards</th>
                <th>Active</th>
                <th>Winner Id</th>
                <th>N Players</th>
                <th>Current Turn</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((game) => (
                <tr>
                  <td>{game.id}</td>
                  <td>{game.admin_id}</td>
                  <td>{game.name}</td>
                  <td>{game.min_players}</td>
                  <td>{game.max_players}</td>
                  <td>{game.starting_cards}</td>
                  <td>{game.active.toString()}</td>
                  <td>{game.winner_id}</td>
                  <td>{game['match'].n_players}</td>
                  <td>{game['match'].current_turn}</td>
                  <td>{game.createdAt}</td>

                  <td>
                    <button onClick={() => deleteGame(game.id)}>Delete</button>
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

export default AdminGameMatch;

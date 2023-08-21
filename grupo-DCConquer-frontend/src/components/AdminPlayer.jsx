import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LinksAdmin from './LinksAdmin';
import axios from 'axios';
import '../assets/styles/admin.css';
import { SERVER_URL } from '../App';
import { useNavigate } from 'react-router-dom';
import { replace } from 'formik';

function AdminPlayers() {
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
        const url = `${SERVER_URL}/players`;
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

  async function deletePlayer(player_id) {
    const url = `${SERVER_URL}`;
    await axios
      .delete(`${url}/players/${player_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = '/admin_player';
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
        <LinksAdmin title="Players" />
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((player) => (
                <tr>
                  <td>{player.id}</td>
                  <td>{player.username}</td>
                  <td>{player.email}</td>
                  <td>{player.avatar}</td>
                  <td>
                    <button onClick={() => deletePlayer(player.id)}>
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

export default AdminPlayers;

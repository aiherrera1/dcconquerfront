import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LinksAdmin from './LinksAdmin';

import axios from 'axios';
import '../assets/styles/admin.css';
import { SERVER_URL } from '../App';
import { useNavigate } from 'react-router-dom';

function AdminRequests() {
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
        const url = `${SERVER_URL}/requests`;
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

  async function deleteRequest(player_id, match_id) {
    const url = `${SERVER_URL}/requests/${match_id}`;
    await axios
      .delete(`${url}/players/${player_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
    // navigate(`/waiting_room_admin/${id}`);
    window.location.reload(false);
  }

  return (
    <div className="admin-style">
      <Navbar />
      <div className="background">
        <LinksAdmin title="Requests" />
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Match Id</th>
                <th>Player Id</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request) => (
                <tr>
                  <td>{request.id}</td>
                  <td>{request.match_id}</td>
                  <td>{request.player_id}</td>
                  <td>{request.createdAt}</td>
                  <td>
                    <button
                      onClick={() =>
                        deleteRequest(request.player_id, request.match_id)
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

export default AdminRequests;

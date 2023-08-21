import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../App';
import Navbar from './Navbar';
import '../assets/styles/ranking.css';
import axios from 'axios';

function Ranking() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${SERVER_URL}/rankings`;
	      console.log(url);
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
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="ranking-style">
      <Navbar />
      <div className="background">
        <table>
          <tr>
            <th>N</th>
            <th>Username</th>
            <th>Victories</th>
          </tr>
          {data.map((ranking) => (
            <tr>
              <td></td>
              <td>{ranking.username}</td>
              <td>{ranking.gamesWon}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Ranking;

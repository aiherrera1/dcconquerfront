import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../App';
import Navbar from './Navbar';
import '../assets/styles/available_matches.css';

function AvailableMatches() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

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
      }
    };

    fetchData();
  }, []);
  function illuminateMatch(match_id) {
    let matches = document.getElementsByClassName('match lightened-match');

    for (let i = 0; i < matches.length; i += 1) {
      matches[i].className = 'match';
    }

    if (document.getElementById(match_id).className == 'match') {
      document.getElementById(match_id).className = 'match lightened-match';
      setSelected(match_id);
    } else {
      document.getElementById(match_id).className = 'match';
    }
  }

  const addPlayerToGame = async () => {
    const url = `${SERVER_URL}/requests`;
    const body = {
      match_id: selected,
    };
    await axios
      .post(url, body, {
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
    window.location.href = `waiting_room/${selected}`;
  };

  return (
    <div className="am-style">
      <Navbar />
      <div className="background">
        <div className="page">
          <div className="label">
            <p>Available Matches</p>
          </div>
          <div className="box">
            {/* <div className="search">
              <p>Enter Match Name: </p>
              <input type="text"></input>
            </div> */}
            {data.map((game) => (
              <div>
                {!game.active ? (
                  <div
                    id={game.id}
                    className="match"
                    onClick={() => illuminateMatch(game.id)}
                  >
                    <p>{game.name}</p>
                    <div className="minmax">
                      <p>
                        {game.match.n_players}/{game.max_players}
                      </p>
                      <img
                        src={require('../assets/images/join_match.png')}
                        alt="Warriors Heads"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          <div className="continue">
            <a onClick={addPlayerToGame}>Continue</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// module.export = AvailableMatches;
export default AvailableMatches;

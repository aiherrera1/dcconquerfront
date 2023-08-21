import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTotalWarriors,
  getTotalTerritories,
} from './functions/matchFunctions';

function MatchStats(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const endTurn = async (props2) => {
    const url = `${SERVER_URL}/matches/${id}`;
    const body = {
      match_id: id,
      player_id: playerId,
      warriors: props2.warriors,
      owners: props2.owners,
      diceCards: 0,
      wallCards: 0,
      shipCards: 0,
      score: 0,
    };
    await axios
      .put(url, body, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
          window.location.href = `/match/${id}`;
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  };

  async function leaveMatch(playerId) {
    console.log(playerId, id);
    const url = `${SERVER_URL}/leavematch/${id}`;
    await axios
      .delete(`${url}/players/${playerId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('matches'),
          )}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        let warriors_array = [];
        let owners_array = [];
        const territories = response.body;
        for (let i = 0; i < territories.length; i++) {
          const element = territories[i];
          warriors_array.push(element.warriors);
          owners_array.push(element.player_id);
        }
        endTurn(playerId={playerId}, warriors={warriors_array}, owners={owners_array});
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
    // navigate(`/waiting_room_host/${id}`);
    // window.location.reload(false);
    // navigate(`/profile/${playerId}`);
  }
  return (
    <div className="stats">
      <h2>Match Stats</h2>
      {props.players.map((player) => (
        <div
          key={`${player.id}`}
          className={`player p${player.PlayersInMatch.turn}-border`}
        >
          <img
            src={require(`../assets/images/avatars/${player.avatar}`)}
            alt={player.avatar}
          />
          <p>P{player.PlayersInMatch.turn + 1}</p>
          <div className="player-stats">
            <p>{player.username}</p>
            <p>
              Warriors:{' '}
              {getTotalWarriors(
                props.warriors,
                props.owners,
                player.PlayersInMatch.turn,
              )}
            </p>
            <p>
              Territories:{' '}
              {getTotalTerritories(props.owners, player.PlayersInMatch.turn)}
            </p>
          </div>
        </div>
      ))}

      { props.lost || props.winner!='' ? (
        <button id="Leave" onClick={() => navigate(`/profile/${props.player_id}`)}>Exit match</button>
      ) : !props.lost  && props.currently_playing===props.username ? (
        <button id="Leave" onClick={() => leaveMatch(props.player_id)}>Surrender</button>
      ) : (
        <button id="Leave">Wait for your turn</button>
      )}
    </div>
  );
}

export default MatchStats;

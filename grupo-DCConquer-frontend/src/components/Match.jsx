import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Hex from './Hex';
import MatchStats from './MatchStats';
import '../assets/styles/match.css';
import '../assets/styles/board.css';
import axios from 'axios';
import Ship from './Ship';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SERVER_URL } from '../App';
import {
  getDiceScore,
  reachableTerritories,
  aliens,
  blackDeath,
  howTheyGrow,
  getTotalWarriors,
  getTotalTerritories,
  getAdjacentTerritories,
  wallSide,
  war,
  earthquake,
} from './functions/matchFunctions.js';

function Match() {
  let send_warriors = document.getElementById('send-warriors');
  if (send_warriors) {
    send_warriors.addEventListener('keydown', (e) => e.preventDefault());
  }
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [kind, setKind] = useState('');
  const [available, setAvailable] = useState('');
  const [gotCard, setGotCard] = useState(false);
  const [threwFirstDice, setThrewFirstDice] = useState(false);
  const [threwSecondDice, setThrewSecondDice] = useState(false);
  const [usedDiceCard, setUsedDiceCard] = useState(false);
  const [attacked, setAttacked] = useState(false);
  const [oldWarriors, setOldWarriors] = useState();
  const [currentWarrirors, setCurrentWarriors] = useState(1);
  const [fromWarriors, setFromWarriors] = useState(0);
  const [currentlyPlaying, setCurentlyPlaying] = useState('');
  const [setttingWalls, setSettingWalls] = useState(false);
  const [firstWall, setFirstWall] = useState();

  const [dice, setDice] = useState([
    'default',
    'default',
    'default',
    'default',
    'default',
  ]);

  const [availableTerritory, setAvailableTerritory] = useState([]);

  const [warriors, setWarriors] = useState([]);
  const [owners, setOwners] = useState([]);
  const [colors, setColors] = useState([]);
  const [walls, setWalls] = useState([]);
  const [ships, setShips] = useState([]);

  const [wallCards, setWallCards] = useState(0);
  const [shipCards, setShipCards] = useState(0);
  const [diceCards, setDiceCards] = useState(0);
  const [card, setCard] = useState('default.png');

  const [playerId, setPlayerId] = useState();
  const [playerUsername, setPlayerUsername] = useState();
  const [players, setPlayers] = useState([]);
  const [fromTerritory, setFromTerritory] = useState();
  const [newTerritory, setNewTerritory] = useState();
  const [turn, setTurn] = useState();
  const [lost, setLost] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState('');
  const [lastVal, setLastVal] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${SERVER_URL}/matches/${id}`;
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('matches'),
            )}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            let players = data.match.players;
            setPlayerId(data.player.id);
            setPlayerUsername(data.player.username);
            let orderedPlayers = [];
            for (let i = 0; i < players.length; i++) {
              for (let j = 0; j < players.length; j++) {
                const element = players[j];
                if (element.PlayersInMatch.turn == i) {
                  orderedPlayers.push(element);
                }
              }
            }
            players.forEach((player) => {
              if (
                data.match.current_turn % data.match.n_players ===
                player.PlayersInMatch.turn
              ) {
                setCurentlyPlaying(player.username);
              }
            });
            setPlayers(orderedPlayers);
            if (
              data.playerInMatch.turn ===
              data.match.current_turn % data.match.n_players
            ) {
              setAvailable('available');
            } else {
              setAvailable('notAvailable');
            }
            //order players (maybe do it by warriors or territories)
            // checks if it's current players turn
            // todo change view if current user is not a player of this game
            // sets warriors of each territory
            let warriors_array = [];
            let colors_array = [];
            let owners_array = [];
            let walls_array = [];
            let ships_array = [];
            const territories = data.territories;
            for (let i = 0; i < territories.length; i++) {
              const element = territories[i];
              warriors_array.push(element.warriors);
              owners_array.push(element.player_id);
              colors_array.push(`p${element.player_id}-color`);
              walls_array.push(element.walls);
              ships_array.push(element.ship_level);
            }
            setColors(colors_array);
            setWarriors(warriors_array);
            setOwners(owners_array);
            setWalls(walls_array);
            setShips(ships_array);

            if (
              getTotalTerritories(owners_array, data.playerInMatch.turn) === 0
            ) {
              setLost(true);
            }
            if (data.match.game.winner_id !== -1) {
              players.forEach((player) => {
                if (player.id === data.match.game.winner_id) {
                  setWinner(player.username);
                }
              });
              setGameEnded(true);
            }
            //set card count of player
            setWallCards(data.playerInMatch.wall_cards);
            setDiceCards(data.playerInMatch.dice_cards);
            setShipCards(data.playerInMatch.ship_cards);

            setTurn(data.playerInMatch.turn);
            if (data.turn) {
              setGotCard(data.turn.card);
              setThrewFirstDice(data.turn.threw_first);
              setThrewSecondDice(data.turn.threw_second);
              setUsedDiceCard(data.turn.dice_card);
              setDice(data.turn.dices.split(','));
              setAttacked(data.turn.attacked);
              setFromTerritory(data.turn.from);
              setNewTerritory(data.turn.to);
              setFromWarriors(data.turn.from_warriors);
              if (data.turn.to) {
                setAvailableTerritory([]);
              }
              if (
                (data.turn.threw_second || data.turn.dice_card) &&
                data.playerInMatch.turn ===
                  data.match.current_turn % data.match.n_players &&
                !data.turn.attacked &&
                !data.turn.to
              ) {
                setAvailableToMyOwn(owners_array, data.playerInMatch.turn);
              }
              let numbers = [];
              for (let i = 0; i < data.turn.dices.split(',').length - 1; i++) {
                const element = data.turn.dices.split(',')[i];
                let arr = element.split('');
                numbers.push(parseInt(arr[arr.length - 1]));
              }
              let { bestScore, kind } = getDiceScore(numbers);
              setScore(bestScore);
              setKind(kind);
              if (data.turn.threw_second) {
                for (let i = 1; i < 6; i++) {
                  let element = document.getElementById(`cb${i}`);
                  if (element) {
                    element.checked = true;
                    element.disabled = true;
                  }
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          navigate('/error');
        });
    };

    fetchData();
  }, []);

  function throwDice() {
    let newDice = [];
    let numbers = [];
    if (!threwFirstDice) {
      for (let i = 0; i < 5; i++) {
        let number = Math.floor(Math.random() * 6) + 1;
        numbers.push(number);
        newDice.push(`dice${number}`);
        document.getElementById(`cb${i + 1}`).disabled = false;
      }
      setDice(newDice);
      setThrewFirstDice(true);
      postTurn(0, warriors, owners, newDice, true, false, false, false);
    } else {
      for (let i = 0; i < 5; i++) {
        if (!document.getElementById(`cb${i + 1}`).checked) {
          let number = Math.floor(Math.random() * 6) + 1;
          numbers.push(number);
          newDice.push(`dice${number}`);
        } else {
          numbers.push(parseInt(dice[i].replace('dice', '')));
          newDice.push(dice[i]);
        }
        document.getElementById(`cb${i + 1}`).checked = true;
        document.getElementById(`cb${i + 1}`).disabled = true;
      }
      setAvailableToMyOwn(owners, turn);

      setDice(newDice);
      setThrewSecondDice(true);
      postTurn(0, warriors, owners, newDice, true, true, usedDiceCard, false);
      if (usedDiceCard) {
        decreaseDiceCard();
      }
    }
    let { bestScore, kind } = getDiceScore(numbers);

    setScore(bestScore);
    setKind(kind);
  }

  function keepScore() {
    for (let i = 1; i < 6; i++) {
      document.getElementById(`cb${i}`).checked = true;
      document.getElementById(`cb${i}`).disabled = true;
    }
    setThrewSecondDice(true);
    setAvailableToMyOwn(owners, turn);
  }

  function setAvailableToMyOwn(owners, player_turn) {
    let newReach = [];
    for (let index = 0; index < owners.length; index++) {
      const element = owners[index];
      if (element === player_turn) {
        newReach.push('available');
      } else {
        newReach.push('');
      }
    }
    setAvailableTerritory(newReach);
  }

  function getCard() {
    if (!gotCard) {
      let card = Math.floor(Math.random() * 100) + 1;
      let cardNumber = 0;
      let newWarriors = [...warriors];
      let newOwners = [...owners];
      if (card <= 10) {
        setShipCards((prevShipCards) => prevShipCards + 1);
        setCard('ship.png');
        cardNumber = 1;
      } else if (card <= 25) {
        setDiceCards(diceCards + 1);
        cardNumber = 2;
        setCard('dice.png');
      } else if (card <= 40) {
        setWallCards(wallCards + 1);
        cardNumber = 3;
        setCard('wall.png');
      } else if (card <= 50) {
        cardNumber = 4;
        setCard('covid_19.png');
        endTurn(false);
      } else if (card <= 60) {
        let { functionNewWarriors, functionNewOwners } = blackDeath(
          warriors,
          owners,
          turn,
        );
        //console.log(functionNewOwners);
        newWarriors = functionNewWarriors;
        newOwners = functionNewOwners;
        setWarriors(functionNewWarriors);
        setOwners(functionNewOwners);
        let newColors = [...colors];
        for (let i = 0; i < functionNewOwners.length; i++) {
          const owner = functionNewOwners[i];
          newColors[i] = `p${owner}-color`;
        }
        setColors(newColors);

        cardNumber = 5;
        setCard('black_death.png');
      } else if (card <= 70) {
        newWarriors = howTheyGrow(warriors, owners, turn);
        setWarriors(newWarriors);
        cardNumber = 6;
        setCard('how_they_grow.png');
      } else if (card <= 85) {
        cardNumber = 7;
        earthquake(walls, turn);
        setCard('earthquake.png');
      } else {
        cardNumber = 8;
        newWarriors = aliens(warriors, owners, turn);
        setWarriors(newWarriors);
        setCard('aliens.png');
      }
      let element = document.getElementById('popup');
      element.style.visibility = 'visible';
      setGotCard(true);
      postTurn(
        cardNumber,
        newWarriors,
        newOwners,
        dice,
        false,
        false,
        false,
        false,
      );
    }
  }

  const postTurn = async (
    num,
    newWarriors,
    owners,
    dices,
    first,
    second,
    used_dice,
    attacked,
    to_territory,
    from_warriors,
  ) => {
    //console.log(newWarriors);
    const url = `${SERVER_URL}/turn/${id}`;
    const body = {
      warriors: newWarriors,
      owners: owners,
      card: num,
      threw_first: first,
      threw_second: second,
      used_dice: used_dice,
      dices: dices,
      from: fromTerritory,
      to: to_territory,
      from_warriors: from_warriors,
      attacked: attacked,
    };
    //console.log(body);
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
  };

  const endTurn = async (refresh) => {
    const url = `${SERVER_URL}/matches/${id}`;
    const body = {
      match_id: id,
      player_id: playerId,
      warriors: warriors,
      owners: owners,
      diceCards: diceCards,
      wallCards: wallCards,
      shipCards: shipCards,
      score: score,
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
        if (response.status === 201 && refresh) {
          window.location.href = `/match/${id}`;
        }
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  };

  const decreaseDiceCard = async () => {
    const url = `${SERVER_URL}/dice`;
    const body = {
      match_id: id,
      player_turn: turn,
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
        console.log(response.status);
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  };

  const postWall = async (first_territory, second_territory) => {
    const url = `${SERVER_URL}/walls`;
    const body = {
      match_id: id,
      player_turn: turn,
      first_territory: first_territory,
      second_territory: second_territory,
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
  };

  function selectTerritory(pos) {
    if (!setttingWalls) {
      if (availableTerritory[pos - 1] === 'available') {
        if (!fromTerritory) {
          setUsedDiceCard(true);
          setFromTerritory(pos);
          let newWarriors = [...warriors];
          newWarriors[pos - 1] = warriors[pos - 1] + score;
          setWarriors(newWarriors);
          setAvailableTerritory(
            reachableTerritories(
              warriors,
              owners,
              turn,
              score,
              ships[pos - 1],
              pos,
              walls,
            ),
          );
        } else {
          let { newWarriors, newOwners, newWalls } = war(
            fromTerritory - 1,
            pos - 1,
            owners,
            warriors,
            walls,
            ships[fromTerritory - 1],
          );
          setWarriors(newWarriors);
          setWalls(newWalls);
          setOwners(newOwners);
          setNewTerritory(pos);
          setFromWarriors(newWarriors[fromTerritory - 1]);
          let newColors = [...colors];
          newColors[pos - 1] = `p${turn}-color`;
          setColors(newColors);
          setAvailableTerritory([]);
          postTurn(
            0,
            newWarriors,
            newOwners,
            dice,
            true,
            true,
            true,
            false,
            pos,
            newWarriors[fromTerritory - 1],
          );
        }
      }
    } else {
      if (!firstWall) {
        if (availableTerritory[pos - 1] === 'available') {
          setFirstWall(pos);
          setAvailableTerritory(getAdjacentTerritories(pos, walls));
        }
      } else {
        if (availableTerritory[pos - 1] === 'available') {
          setSettingWalls(false);
          setFirstWall();
          postWall(firstWall, pos);
          let newWalls = [...walls];
          newWalls[firstWall - 1].push([wallSide[`${firstWall},${pos}`], turn]);
          newWalls[pos - 1].push([wallSide[`${pos},${firstWall}`], turn]);
          setWalls(newWalls);
          setAvailableTerritory([]);
        }
      }
    }
  }

  function useDiceCard() {
    setThrewSecondDice(false);
    setUsedDiceCard(true);
    setAvailableTerritory([]);
    setDiceCards(diceCards - 1);
    for (let i = 0; i < 5; i++) {
      document.getElementById(`cb${i + 1}`).checked = false;
      document.getElementById(`cb${i + 1}`).disabled = false;
    }
  }

  function handleEvt(evt) {
    //console.log(evt.currentTarget.value);
    //console.log(evt.currentTarget.value, lastVal);
    let newWarriors = [...warriors];
    if (parseInt(lastVal) < parseInt(evt.currentTarget.value)) {
      //console.log(fromTerritory);
      newWarriors[fromTerritory - 1] -= 1;
      newWarriors[newTerritory - 1] += 1;
    } else {
      //console.log('down');
      newWarriors[fromTerritory - 1] += 1;
      newWarriors[newTerritory - 1] -= 1;
    }

    setWarriors(newWarriors);
    setLastVal(evt.currentTarget.value);
  }

  useEffect(() => {
    if (currentWarrirors) {
      let newWarriors = [...warriors];
      newWarriors[newTerritory - 1] = currentWarrirors - oldWarriors;
      newWarriors[fromTerritory - 1] = fromWarriors - currentWarrirors;
      setWarriors(newWarriors);
    }
  }, [currentWarrirors]);

  useEffect(() => {
    if (threwFirstDice && gotCard) {
      for (let i = 0; i < 5; i++) {
        let dice = document.getElementById(`cb${i + 1}`);
        if (dice) {
          dice.disabled = false;
        }
      }
    }
  }, [threwFirstDice]);

  function unavailableFeature() {
    alert('This feature is not available right now');
  }

  function setWall() {
    if (attacked && available === 'available' && wallCards > 0) {
      setWallCards(wallCards - 1);
      setSettingWalls(true);
      setAvailableToMyOwn(owners, turn);
    }
  }

  function hideCard() {
    let element = document.getElementById('popup');
    element.style.visibility = 'hidden';
    if (card === 'covid_19.png') {
      window.location.href = `/match/${id}`;
    }
  }

  function attackTerritory() {
    if (lastVal !== 0) {
      setAttacked(true);
      postTurn(0, warriors, owners, dice, true, true, true, true);
    }
  }

  return (
    <body className="match-style">
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className="background">
          <div className="grid-container">
            <div className="board">
              {warriors.map((warriors, i) => (
                <Hex
                  color={colors[i]}
                  warriors={warriors}
                  available={availableTerritory[i]}
                  owner={owners[i]}
                  walls={walls[i]}
                  n={i + 1}
                  match_id={id}
                  ship={ships[i]}
                  onClick={() => selectTerritory(i + 1)}
                  turn={turn}
                  myTurn={available}
                  shipCards={shipCards}
                />
              ))}
            </div>
            {available === 'available' && !gameEnded ? (
              <div className="troops-cards">
                <div className="troops">
                  {!gotCard ? (
                    <p>Pick A Card To Continue</p>
                  ) : !threwSecondDice ? (
                    <p>Throw Dice To Continue</p>
                  ) : !fromTerritory && !attacked ? (
                    <p>Place Warriors</p>
                  ) : !newTerritory && !attacked ? (
                    <p>Select Territory You Want To Attack</p>
                  ) : !attacked ? (
                    <div className="send-warriors">
                      <p>How Many Warriors Would You Like To Send</p>
                      <div className="warriors-attack">
                        <input
                          type="number"
                          min={1}
                          max={fromWarriors - 1}
                          onChange={(evt) => handleEvt(evt)}
                          id="send-warriors"
                        ></input>
                        <button onClick={() => attackTerritory()}>
                          Attack
                        </button>
                      </div>
                    </div>
                  ) : setttingWalls && !firstWall ? (
                    <p>Select one of your territories to place a wall</p>
                  ) : setttingWalls && firstWall ? (
                    <p>Select Adjacent Territory to place wall</p>
                  ) : (
                    <p>End your Turn or use a Card</p>
                  )}
                </div>
                {!gotCard ? (
                  <button className="deck" onClick={() => getCard()} id="deck">
                    <p id="2-btn-text">Pick a Card</p>
                    <img
                      src={require('../assets/images/pick_a_card.png')}
                      alt="Pick A Card "
                      id="2-btn-img"
                    />
                  </button>
                ) : (
                  <div className="throw-dice">
                    <p>Current Score: {score}</p>
                    <p>{kind}</p>
                    <div className="dice-row">
                      <input type="checkbox" id="cb1" disabled="disabled" />
                      <label for="cb1">
                        <img
                          src={require(`../assets/images/dice/${dice[0]}.png`)}
                          alt={`${dice[0]}`}
                          draggable="false"
                        />
                      </label>
                      <input type="checkbox" id="cb2" disabled="disabled" />
                      <label for="cb2">
                        <img
                          src={require(`../assets/images/dice/${dice[1]}.png`)}
                          alt={`${dice[1]}`}
                          draggable="false"
                        />
                      </label>
                      <input type="checkbox" id="cb3" disabled="disabled" />
                      <label for="cb3">
                        <img
                          src={require(`../assets/images/dice/${dice[2]}.png`)}
                          alt={`${dice[2]}`}
                          draggable="false"
                        />
                      </label>
                    </div>
                    <div className="dice-row">
                      <input type="checkbox" id="cb4" disabled="disabled" />
                      <label for="cb4">
                        <img
                          src={require(`../assets/images/dice/${dice[3]}.png`)}
                          alt={`${dice[3]}`}
                          draggable="false"
                        />
                      </label>
                      <input type="checkbox" id="cb5" disabled="disabled" />
                      <label for="cb5">
                        <img
                          src={require(`../assets/images/dice/${dice[4]}.png`)}
                          alt={`${dice[4]}`}
                          draggable="false"
                        />
                      </label>
                    </div>
                    {!threwFirstDice ? (
                      <div className="dice-options">
                        <button onClick={() => throwDice()}>Throw Dice</button>
                      </div>
                    ) : !threwSecondDice ? (
                      <div className="dice-options">
                        <button onClick={() => throwDice()}>Throw Again</button>
                        <button onClick={() => keepScore()}>Keep Score</button>
                      </div>
                    ) : (
                      <div className="dice-options">
                        <button onClick={() => endTurn(true)}>End Turn</button>
                        {!usedDiceCard && diceCards > 0 ? (
                          <button onClick={useDiceCard}>Use Dice Card</button>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-turn">
                {!lost && !gameEnded ? (
                  <div>
                    <p>It's not your turn, please refresh and try again</p>
                    <br></br>
                    <p>Currently Playing: {currentlyPlaying}</p>
                  </div>
                ) : !gameEnded && lost ? (
                  <div>
                    <p>You Lost</p>
                    <br></br>
                    <p>Currently Playing: </p>
                  </div>
                ) : (
                  <div>
                    <p>The Match Is Over!</p>
                    <br></br>
                    <p>Winner: {winner}</p>
                  </div>
                )}
              </div>
            )}

            <div className="cards">
              <div className="card" onClick={() => setWall()}>
                <img
                  className={wallCards > 0 ? available : ''}
                  src={require('../assets/images/cards/english/wall.png')}
                  alt="Wall Card"
                  draggable="false"
                />
                <div className="count" id="wall">
                  {`X${wallCards}`}
                </div>
              </div>
              <div className="card">
                {shipCards > 0 ? (
                  <Ship />
                ) : (
                  <img
                    src={require('../assets/images/cards/english/ship.png')}
                    alt="Ship Card"
                    draggable="false"
                  />
                )}
                <div className="count" id="ship">
                  {`X${shipCards}`}
                </div>
              </div>
              <div className="card">
                <img
                  src={require('../assets/images/cards/english/dice.png')}
                  alt="dice card"
                  draggable="false"
                />
                <div className="count" id="dice">
                  {`X${diceCards}`}
                </div>
              </div>
              <div className="self-stats">
                <p>Warriors: {getTotalWarriors(warriors, owners, turn)}</p>
                <p>Territories: {getTotalTerritories(owners, turn)}</p>
              </div>
            </div>
            <MatchStats 
              owners={owners}
              warriors={warriors}
              players={players}
              player_id={playerId}
              lost={lost}
              currently_playing={currentlyPlaying}
              username={playerUsername}
              winner={winner}
            />
          </div>
          <div className="popup" id="popup">
            <img src={require(`../assets/images/cards/english/${card}`)}></img>
            <button onClick={() => hideCard()}>X</button>
          </div>
        </div>
      </DndProvider>
    </body>
  );
}

export default Match;

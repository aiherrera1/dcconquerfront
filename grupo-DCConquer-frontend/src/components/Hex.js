import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { SERVER_URL } from '../App';
import axios from 'axios';

function Hex(props) {
  const [shipLevel, setShipLevel] = useState(props.ship);
  const [shipCards, setShipCards] = useState(props.shipCards);
  function getRow(n) {
    if (n === 1) {
      return 1;
    } else if ([2, 12].includes(n)) {
      return 2;
    } else if ([3, 11, 13].includes(n)) {
      return 3;
    } else if ([14, 18].includes(n)) {
      return 4;
    } else if ([4, 10, 19].includes(n)) {
      return 5;
    } else if ([15, 17].includes(n)) {
      return 6;
    } else if ([5, 16, 9].includes(n)) {
      return 7;
    } else if ([6, 8].includes(n)) {
      return 8;
    } else {
      return 9;
    }
  }

  function getCol(n) {
    if ([9, 10, 11].includes(n)) {
      return 1;
    } else if ([8, 12, 17, 18].includes(n)) {
      return 2;
    } else if ([1, 7, 13, 16, 19].includes(n)) {
      return 3;
    } else if ([2, 6, 14, 15].includes(n)) {
      return 4;
    } else {
      return 5;
    }
  }

  function getWall(walls, n) {
    let w = [];
    let o = [];
    walls.forEach((wall) => {
      w.push(wall[0]);
      o.push(wall[1]);
    });
    if (w.includes(n)) {
      return true;
    } else {
      return false;
    }
  }

  function getColor(walls, n) {
    let color = ``;
    walls.forEach((wall) => {
      if (wall[0] === n) {
        color = `p${wall[1]}-wall`;
      }
    });
    return color;
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => addShip(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addShip = async () => {
    if (
      props.n <= 12 &&
      shipLevel <= 3 &&
      props.turn === props.owner &&
      props.myTurn === 'available'
    ) {
      const url = `${SERVER_URL}/ship`;
      const body = {
        match_id: props.match_id,
        position_id: props.n,
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
          if (response.status == 201) {
            setShipCards((prevShipCards) => prevShipCards - 1);
            setShipLevel((prevShipLevel) => prevShipLevel + 1);
            window.location.href = `/match/${props.match_id}`;
          } else {
            alert('you dont have enough cards');
          }
          console.log(response.status);
        })
        .catch((error) => {
          alert(`[${error.response.status}] ${error.response.data}`);
        });
    }
  };

  return (
    <div
      className={
        isOver && props.n <= 12 && props.turn === props.owner
          ? `hex col-${getCol(props.n)} row-${getRow(props.n)} ${
              props.color
            } over`
          : `hex col-${getCol(props.n)} row-${getRow(props.n)} ${props.color} ${
              props.available
            }`
      }
      onClick={props.onClick}
      ref={drop}
    >
      <div className="right">
        {getWall(props.walls, 6) ? (
          <div className={`wall-top ${getColor(props.walls, 6)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <></>
        )}
        {getWall(props.walls, 3) ? (
          <div className={`wall-bottom ${getColor(props.walls, 3)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="left">
        {getWall(props.walls, 2) ? (
          <div className={`wall-top ${getColor(props.walls, 2)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <></>
        )}
        {getWall(props.walls, 5) ? (
          <div className={`wall-bottom ${getColor(props.walls, 5)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="mid">
        {getWall(props.walls, 1) ? (
          <div className={`wall-top ${getColor(props.walls, 1)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <></>
        )}
        <div className="warriors">{props.warriors}</div>
        {getWall(props.walls, 4) ? (
          <div className={`wall-bottom ${getColor(props.walls, 4)}`}>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {props.n <= 12 && shipLevel > 0 ? (
        <div className={`ship-container${props.n} ship-container`}>
          <img
            src={require(`../assets/images/ship.png`)}
            alt={`ship`}
            className={`ship`}
          />
          <div className="topright">{shipLevel}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Hex;

import axios from 'axios';
import { SERVER_URL } from '../../App';

// Defines aliens function

export function howTheyGrow(warriors, owners, player) {
  const newWarriors = [...warriors];
  for (let index = 0; index < warriors.length; index++) {
    const warrior = warriors[index];
    const owner = owners[index];
    if (owner === player) {
      newWarriors[index] = Math.floor(warrior * 1.25);
    }
  }
  return newWarriors;
}

// function from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function aliens(warriors, owners, player) {
  let player_warriors = [];
  let contador2 = 0;
  for (let i = 0; i < owners.length; i++) {
    if (owners[i] === player) {
      player_warriors[contador2] = warriors[i];
      contador2 += 1;
    }
  }
  player_warriors = shuffle(player_warriors);
  let contador = 0;
  for (let i = 0; i < owners.length; i++) {
    if (owners[i] === player) {
      warriors[i] = player_warriors[contador];
      contador += 1;
    }
  }
  return warriors;
}

// Defines black_death(warriors, owners, player) 25%, returns warriors and owners

export function blackDeath(warriors, owners, player) {
  let functionNewWarriors = [...warriors];
  let functionNewOwners = [...owners];
  for (let i = 0; i < functionNewWarriors.length; i++) {
    if (functionNewOwners[i] === player) {
      if (functionNewWarriors[i] === 1) {
        functionNewWarriors[i] = 0;
      } else {
        functionNewWarriors[i] = Math.trunc(
          functionNewWarriors[i] - functionNewWarriors[i] / 4,
        );
      }
    }
  }
  let counter = functionNewOwners.filter((x) => x === player).length;
  for (let i = 0; i < functionNewOwners.length; i++) {
    if (functionNewOwners[i] === player) {
      if (functionNewWarriors[i] === 0 && counter !== 1) {
        functionNewOwners[i] = -1;
        counter = counter - 1;
      }
    }
  }

  return { functionNewWarriors, functionNewOwners };
}

export function getTotalWarriors(warriors, owners, player) {
  let contador = 0;
  for (let i = 0; i < warriors.length; i++) {
    if (owners[i] === player) {
      contador += warriors[i];
    }
  }
  return contador;
}

// Defines get_total_territories(owners, player)

export function getTotalTerritories(owners, player) {
  let contador = 0;
  for (let i = 0; i < owners.length; i++) {
    if (owners[i] === player) {
      contador += 1;
    }
  }
  return contador;
}

// Defines get_dice_score(dice)

export function getDiceScore(dice) {
  let bestScore = 0;
  let kind = '';

  let repetitions = 0;
  for (let i = 1; i < dice.length + 2; i++) {
    if (repetitions <= dice.filter((x) => x === i).length) {
      repetitions = dice.filter((x) => x === i).length;
    }
  }

  if (repetitions === 1) {
    if (bestScore <= 30) {
      bestScore = 30;
      kind = 'All Diferent';
    }
  }

  if (repetitions === 2) {
    if (bestScore <= 5) {
      bestScore = 5;
      kind = 'One Pair';
    }
  } else if (repetitions === 3) {
    if (bestScore <= 20) {
      bestScore = 20;
      kind = 'Three of a Kind';
    }
  } else if (repetitions === 4) {
    if (bestScore <= 75) {
      bestScore = 75;
      kind = 'Four of a Kind';
    }
  } else if (repetitions === 5) {
    if (bestScore <= 100) {
      bestScore = 100;
      kind = 'Five of a Kind';
    }
  }

  let pairRepetitions = 0;
  for (let i = 1; i < dice.length + 2; i++) {
    if (dice.filter((x) => x === i).length === 2) {
      pairRepetitions += 1;
    }
  }
  if (pairRepetitions >= 2) {
    if (bestScore <= 10) {
      bestScore = 10;
      kind = 'Two Pairs';
    }
  }

  if (repetitions === 3 && pairRepetitions === 1) {
    if (bestScore <= 50) {
      bestScore = 50;
      kind = 'Full House';
    }
  }

  if (
    (dice.includes(1) &&
      dice.includes(2) &&
      dice.includes(3) &&
      dice.includes(4)) ||
    (dice.includes(2) &&
      dice.includes(3) &&
      dice.includes(4) &&
      dice.includes(5)) ||
    (dice.includes(3) &&
      dice.includes(4) &&
      dice.includes(5) &&
      dice.includes(6))
  ) {
    if (bestScore <= 25) {
      bestScore = 25;
      kind = 'Small Straight';
    }
  }
  if (
    (dice.includes(1) &&
      dice.includes(2) &&
      dice.includes(3) &&
      dice.includes(4) &&
      dice.includes(5)) ||
    (dice.includes(2) &&
      dice.includes(3) &&
      dice.includes(4) &&
      dice.includes(5) &&
      dice.includes(6))
  ) {
    if (bestScore <= 55) {
      bestScore = 55;
      kind = 'Big Straight';
    }
  }

  return { bestScore, kind };
}
const reachableByShip = [
  [
    [2, 12],
    [2, 3, 11, 12],
    [2, 3, 4, 10, 11, 12],
    [2, 3, 4, 5, 9, 10, 11, 12],
  ],
  [
    [1, 3],
    [1, 12, 3, 4],
    [1, 11, 12, 3, 4, 5],
    [1, 10, 11, 12, 3, 4, 5, 6],
  ],
  [
    [2, 4],
    [1, 2, 4, 5],
    [1, 2, 12, 4, 5, 6],
    [1, 2, 11, 12, 4, 5, 6, 7],
  ],
  [
    [3, 5],
    [2, 3, 5, 6],
    [1, 2, 3, 5, 6, 7],
    [1, 2, 3, 12, 5, 6, 7, 8],
  ],
  [
    [4, 6],
    [3, 4, 6, 7],
    [2, 3, 4, 6, 7, 8],
    [1, 2, 3, 4, 6, 7, 8, 9],
  ],
  [
    [5, 7],
    [4, 5, 7, 8],
    [3, 4, 5, 7, 8, 9],
    [2, 3, 4, 5, 7, 8, 9, 10],
  ],
  [
    [6, 8],
    [5, 6, 8, 9],
    [4, 5, 6, 8, 9, 10],
    [3, 4, 5, 6, 8, 9, 10, 11],
  ],
  [
    [7, 9],
    [6, 7, 9, 10],
    [5, 6, 7, 9, 10, 11],
    [4, 5, 6, 7, 9, 10, 11, 12],
  ],
  [
    [8, 10],
    [7, 8, 10, 11],
    [6, 7, 8, 10, 11, 12],
    [5, 6, 7, 8, 1, 10, 11, 12],
  ],
  [
    [9, 11],
    [8, 9, 11, 12],
    [7, 8, 9, 1, 11, 12],
    [6, 7, 8, 9, 1, 2, 11, 12],
  ],
  [
    [10, 12],
    [9, 10, 1, 12],
    [8, 9, 10, 1, 2, 12],
    [7, 8, 9, 10, 1, 2, 3, 12],
  ],
  [
    [11, 1],
    [10, 11, 1, 2],
    [9, 10, 11, 1, 2, 3],
    [8, 9, 10, 11, 1, 2, 3, 4],
  ],
];

export function reachableTerritories(
  warriors,
  owners,
  player,
  score,
  ship,
  from,
  walls,
) {
  const reachableT = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  // for (let i = 0; i < owners.length; i++) {
  let adjacentTerritories = AdjacentTerritories[from - 1];
  if (owners[from - 1] === player) {
    for (let j = 0; j < adjacentTerritories.length; j++) {
      let adjTerritory = adjacentTerritories[j];
      // if it has no owner
      if (owners[adjTerritory - 1] === -1) {
        reachableT[AdjacentTerritories[from - 1][j] - 1] = 'available';
        // if it belongs to someone else
      } else if (owners[adjTerritory - 1] !== player) {
        if (
          simulateWar(
            from - 1,
            adjTerritory - 1,
            owners,
            warriors,
            walls,
            ship,
            score,
          ) > 0
        ) {
          reachableT[AdjacentTerritories[from - 1][j] - 1] = 'available';
        }
      }
    }
    if (from <= 12) {
      if (owners[from - 1] === player && ship !== 0) {
        for (let j = 0; j < reachableByShip[from - 1][ship - 1].length; j++) {
          if (owners[reachableByShip[from - 1][ship - 1][j] - 1] === -1) {
            reachableT[reachableByShip[from - 1][ship - 1][j] - 1] =
              'available';
          } else if (
            owners[reachableByShip[from - 1][ship - 1][j] - 1] !== player &&
            owners[reachableByShip[from - 1][ship - 1][j] - 1] !== -1
          ) {
            if (
              warriors[from - 1] + score >
              warriors[owners[reachableByShip[from - 1][ship - 1][j] - 1]]
            ) {
              reachableT[reachableByShip[from - 1][ship - 1][j] - 1] =
                'available';
            }
          }
        }
      }
    }
  }
  return reachableT;
}

const AdjacentTerritories = [
  [2, 12, 13],
  [1, 3, 13, 14],
  [2, 4, 14],
  [3, 5, 14, 15],
  [4, 6, 15],
  [5, 7, 15, 16],
  [6, 8, 16],
  [7, 9, 16, 17],
  [8, 10, 17],
  [9, 11, 17, 18],
  [10, 12, 18],
  [1, 11, 13, 18],
  [1, 2, 12, 14, 18, 19],
  [2, 3, 4, 13, 15, 19],
  [4, 5, 6, 14, 16, 19],
  [6, 7, 8, 15, 17, 19],
  [8, 9, 10, 16, 18, 19],
  [10, 11, 12, 13, 17, 19],
  [13, 14, 15, 16, 17, 18],
];

export function getAdjacentTerritories(pos, walls) {
  const reachableT = [];
  let sides = [];
  walls[pos - 1].forEach((wall) => {
    sides.push(wall[0]);
  });
  AdjacentTerritories[pos - 1].forEach((element) => {
    if (!sides.includes(wallSide[`${pos},${element}`])) {
      reachableT[element - 1] = 'available';
    } else {
      reachableT[element - 1] = '';
    }
  });
  return reachableT;
}

export const wallSide = {
  '1,2': 3,
  '1,13': 4,
  '1,12': 5,

  '2,3': 3,
  '2,14': 4,
  '2,13': 5,
  '2,1': 6,

  '3,4': 4,
  '3,14': 5,
  '3,2': 6,

  '4,3': 2,
  '4,5': 4,
  '4,15': 5,
  '4,14': 6,

  '5,4': 1,
  '5,6': 5,
  '5,15': 6,

  '6,15': 1,
  '6,5': 2,
  '6,7': 5,
  '6,16': 6,

  '7,16': 1,
  '7,6': 2,
  '7,8': 6,

  '8,17': 1,
  '8,16': 2,
  '8,7': 3,
  '8,9': 6,

  '9,10': 1,
  '9,17': 2,
  '9,8': 3,

  '10,11': 1,
  '10,17': 3,
  '10,18': 2,
  '10,9': 4,

  '11,12': 2,
  '11,18': 3,
  '11,10': 4,

  '12,1': 2,
  '12,13': 3,
  '12,18': 4,
  '12,11': 5,

  '13,1': 1,
  '13,2': 2,
  '13,14': 3,
  '13,19': 4,
  '13,18': 5,
  '13,12': 6,

  '14,2': 1,
  '14,3': 2,
  '14,4': 3,
  '14,15': 4,
  '14,19': 5,
  '14,13': 6,

  '15,14': 1,
  '15,4': 2,
  '15,5': 3,
  '15,6': 4,
  '15,16': 5,
  '15,19': 6,

  '16,19': 1,
  '16,15': 2,
  '16,6': 3,
  '16,7': 4,
  '16,8': 5,
  '16,17': 6,

  '17,18': 1,
  '17,19': 2,
  '17,16': 3,
  '17,8': 4,
  '17,9': 5,
  '17,10': 6,

  '18,12': 1,
  '18,13': 2,
  '18,19': 3,
  '18,17': 4,
  '18,10': 5,
  '18,11': 6,

  '19,13': 1,
  '19,14': 2,
  '19,15': 3,
  '19,16': 4,
  '19,17': 5,
  '19,18': 6,
};

export function war(from_pos, to_pos, owners, warriors, walls, ship_level) {
  let newWarriors = [...warriors];
  let newOwners = [...owners];
  let newWalls = [...walls];
  let offense = warriors[from_pos];
  let defense = warriors[to_pos];
  let attacker = owners[from_pos];
  let territoryWalls = walls[from_pos];
  let side = wallSide[`${from_pos + 1},${to_pos + 1}`];

  //checks if there is wall in between
  for (let i = 0; i < territoryWalls.length; i++) {
    const wall = territoryWalls[i];
    if (
      wall[0] === side && // if wall on the side attacking
      wall[1] !== attacker //if wall does not belong to the
    ) {
      if (ship_level !== 0 && from_pos <= 12) {
        if (!reachableByShip[from_pos - 1][ship_level - 1].includes(to_pos)) {
          defense += 20;
          deleteWall(wall[4]);
        }
      } else {
        defense += 20;
        deleteWall(wall[4]);
      }
    }
  }
  newWarriors[from_pos] = offense - defense;
  newWarriors[to_pos] = 0;

  newWalls[to_pos].forEach((wall) => {
    if (wall[1] !== attacker && newOwners[wall[3] - 1] === attacker) {
      deleteWall(wall[4]);
    }
  });

  newOwners[to_pos] = attacker;

  return { newWarriors, newOwners, newWalls };
}

function simulateWar(
  from_pos,
  to_pos,
  owners,
  warriors,
  walls,
  ship_level,
  score,
) {
  let offense = warriors[from_pos] + score;
  let defense = warriors[to_pos];
  let attacker = owners[from_pos];
  let territoryWalls = walls[from_pos];
  let side = wallSide[`${from_pos + 1},${to_pos + 1}`];

  //checks if there is wall in between
  for (let i = 0; i < territoryWalls.length; i++) {
    const wall = territoryWalls[i];
    if (
      wall[0] === side && // if wall on the side attacking
      wall[1] !== attacker //if wall does not belong to the
    ) {
      if (ship_level !== 0 && from_pos <= 12) {
        if (!reachableByShip[from_pos - 1][ship_level - 1].includes(to_pos)) {
          defense += 20;
        }
      } else {
        defense += 20;
      }
    }
  }
  return offense - defense;
}

async function deleteWall(wall_id) {
  const url = `${SERVER_URL}/walls/${wall_id}`;
  await axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('matches'))}`,
      },
    })
    .then((response) => {
      if (response.status === 201) {
        console.log('deleted');
      }
    })
    .catch((error) =>
      alert(`[${error.response.status}] ${error.response.data}`),
    );
}

export function earthquake(walls, player) {
  let walls_ids = [];
  walls.forEach((territory) => {
    territory.forEach((wall) => {
      if (wall[1] == player) {
        walls_ids.push(wall[4]);
      }
    });
  });
  if (walls_ids.length !== 0) {
    destroyWall(walls_ids[Math.floor(Math.random() * walls_ids.length)]);
  }
}

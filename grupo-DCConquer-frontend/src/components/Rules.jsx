import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import "../assets/styles/rules.css";

function Rules() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav li");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
          console.log(current);
        }
      });

      navLi.forEach((li) => {
        li.classList.remove("active");
        if (current.includes(li.id)) {
          li.classList.add("active");
        }
      });
    });

    return;
  }, []);
  return (
    <body className="rules-style">
      <Navbar />

      <nav>
        <div className="container">
          <ul>
            <li className="charesteristics active" id="char">
              <a href="#characteristics">Characteristics</a>
            </li>
            <li className="game" id="gam">
              <a href="#game">Game</a>
            </li>
            <li className="board" id="boar">
              <a href="#board">Board</a>
            </li>
            <li className="cards" id="car">
              <a href="#cards">Cards</a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="characteristics">
        <h3> Characteristics</h3>
        <h5>Game type:</h5>
        <h6>Territory Domain</h6>
        <h5>Objective:</h5>
        <h6>
          DCConquer is a strategy game between 2 to 6 players where, through
          strategy and luck, you must conquer all the territories and thus unify
          the former DCComan Empire. Players will stay in play as long as they
          own at least one territory.
        </h6>
        <h5> Game Format:</h5>
        <h6>
          It is played on a hexagon-shaped board divided into 19 territories in
          the same way. According to the number of people in the game, each
          player will be given one of the most extreme territories on the map
          and all the rest of the territories will be no man's land. The player
          will receive strategy and fortuitous cards, and together with the
          throwing of random dice, which will assign him a number of available
          troops, in his respective turn he must distribute them strategically
          and use the cards either to defend his own territory or to attack the
          opponent.
        </h6>
      </section>

      <section id="game">
        <h3> Game</h3>

        <h5>Start and Turns</h5>
        <h6>
          {" "}
          Once the host user has began the match, each player will be
          randomly given a different color, and an id (P1, P2, P3, P4, P5 or P6)
        </h6>
        <h5> Game Turn</h5>
        <h6>
          In each turn the player will have 2 minutes to do the following:
        </h6>
        <ol>
          <li>Take a card from the deck</li>
          <li>Throw the Dice</li>
          <p>
            The player will proceed to throw 5 dice. Then they will pick which
            of those dice will they throw again. The player's goal is to obtain
            the best hand possible (like poker). The score will give a new
            amount of troops for it to attack adyacent territories.
          </p>
          <table>
            <tr>
              <th>Hand</th>
              <th>Score</th>
            </tr>
            <tr>
              <td>One Pair</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Two Pair</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Three of a kind</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Small Straight</td>
              <td>25</td>
            </tr>
            <tr>
              <td>All diferent</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Full House</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Big straight</td>
              <td>55</td>
            </tr>
            <tr>
              <td>Four of a kind</td>
              <td>75</td>
            </tr>
            <tr>
              <td>Five of a kind</td>
              <td>100</td>
            </tr>
          </table>
          <li>
            A player can use up to 2 cards during their turn, they can play them
            when ever they want through out their turn. They can also choose not
            to use any card.
          </li>
          <ol id="list-cards">
            <li>Ship Card</li>
            <li>Wall Card</li>
            <li>Dice card</li>
          </ol>
          <li>Attack</li>
          <p>
            First the player will choose from which of their territorie will
            they like to attack from. The amount of troops that has the
            territorie of which where we are attacking from plus the score of
            the player got when they threw the dice, it has to be strictly
            bigger than the sum of the points of the wall in between the two
            territories and the amount of troops this other territorie has. The
            amount of troops the territorie has after the attack is the
            difference between these two amounts. The player will be allowed to
            distribute these troops in between the territorie they attacked from
            and the new territorie.
          </p>
          <li>Rearrange Troops</li>
          <p>
            The player has the options to reorganize their troops, allowing them
            to migrate up two time from one territorie to another, specifying
            the amount of troops they will like to move.
          </p>
          <li>End of Turn</li>
          <p>
            Once the player has nothing else to do, he must press the button to
            end their turn. In the event where the two minutes has passed since
            the beginning of their turn, their turn will be automatically
            finished.
          </p>
        </ol>
        <h5> Game Development</h5>
        <ul>
          <li>Eliminating a Player</li>
          <p>
            A medida que se desarrolla la partida, el desplazamiento de las
            tropas permitirá ir conquistando los territorios rivales. A medida
            que los jugadores se queden sin tropas y territorios, serán
            eliminados. Throughout the game, the movement of the troops will
            allow the player to conquer the rival territories. When players are
            left without troops and territories, they will be eliminated.
          </p>
          <li>Abandoning the Match</li>
          <p>
            There will be the possiblity for a player to leave the match at any
            moment. In case a player leaves, their territories and troops will
            be eliminated, and they will be up for grabs for the other players
            to conquer.
          </p>
          <li>Winner</li>
          <p>
            The last player standing will be the winner of the match. This could
            happen by eliminating the other player or if all the other players
            have left the match.
          </p>
        </ul>
        <h5> Game over</h5>
        <h6>
          Once the match is over, the stadistics of will be registered and it
          will be given the option to the players to start a new game.
        </h6>
      </section>

      <section id="board">
        <h3> Board</h3>
        <h6>
          The board consists on 19 hexagon layaout out as it shows in the
          picture below.
        </h6>
        <img
          src={require("../assets/images/boards/board.png")}
          alt="Board"
          id="board"
        ></img>
        <h6>The surrounding of the board is sea.</h6>
        <h6>
          The players will be evenly distributed among the border at the start
          of the game in such a way noone has an advantage.
        </h6>
        <h5>For 2 Players</h5>
        <img
          src={require("../assets/images/boards/2-players.png")}
          alt="2 Player Board"
        ></img>
        <h5>For 3 Players</h5>
        <img
          src={require("../assets/images/boards/3-players.png")}
          alt="3 Player Board"
        ></img>
        <h5>For 4 Players</h5>
        <img
          src={require("../assets/images/boards/4-players.png")}
          alt="4 Player Board"
        ></img>
        <h5>For 5 Players</h5>
        <img
          src={require("../assets/images/boards/5-players.png")}
          alt="5 Player Board"
        ></img>
        <h5>For 6 Players</h5>
        <img
          src={require("../assets/images/boards/6-players.png")}
          alt="6 Player Board"
        ></img>
      </section>

      <section id="cards">
        <h4>Cards:</h4>
        <h5>Strategy Cards:</h5>
        <h6>
          When a Strategy is drawn from the deck the player will be able to hold
          on to it and play it when ever they would like
        </h6>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/ship.png")}
            alt="Ship Card"
          ></img>
          <p>
            {" "}
            This card will allow the player to build a ship in on of his
            territories thats adyacent to the sea, allowing this territorie to
            attack enemy territories through the sea. The ships can be upgraded
            using another Ship Card, allowing it the ship to travel farther in
            sea. The level of a ship will indicate how far it can travel. For
            example a ship of level 2 will be able to travel 2 territories via
            the sea. The ship has a maximum level of 4.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/wall.png")}
            alt="Wall Card"
          ></img>
          <p>
            This card will allow the player to build a wall adyacent to one of
            his territories to give it an additional advantage when deffending
            from attacks. Each wall has 20points of resistance.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/dice.png")}
            alt="Dice Card"
          ></img>
          <p>
            This card will allow that during the throwing of dice, the player
            will have another opportunity to throw them, to get a better score.
            It can only be used once each turn.
          </p>
        </div>
        <h5>Strategy Cards:</h5>
        <h6>
          When a Strategy is drawn from the deck the player will be able to hold
          on to it and play it when ever they would like
        </h6>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/aliens.png")}
            alt="Aliens Card"
          ></img>
          <p>
            {" "}
            This card randomly distributes all of the players warriors around
            their territories. Given that aliens abducted them and droped them
            off.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/covid_19.png")}
            alt="Covid Card"
          ></img>
          <p>
            This card implies that the player will loose a turn since all of
            their warriors are in quarantine.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/black_death.png")}
            alt="Black Death Card"
          ></img>
          <p>
            {" "}
            This card kills 25% of the troops of the player, given that they
            were all infected with the black death.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/earthquake.png")}
            alt="Earthquake Card"
          ></img>
          <p>
            {" "}
            This card implies that a wall chosen at random was destroyed by the
            earthquake.
          </p>
        </div>
        <div className="card">
          <img
            src={require("../assets/images/cards/english/how_they_grow.png")}
            alt="How They Grow Card"
          ></img>
          <p>
            This card grows the troops of the player by 25% given that the kids
            grew up to be warriors.
          </p>
        </div>
      </section>
    </body>
  );
}

export default Rules;

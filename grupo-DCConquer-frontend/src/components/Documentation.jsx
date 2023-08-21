import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import "../assets/styles/documentation.css";

function Documentation() {
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
    <body className="documentation-style">
      <Navbar />

      <nav>
        <div className="container">
          <ul>
            <li className="mainpage active" id="n1">
              <a href="#nn1">Main Page (Home)</a>
            </li>
            <li className="navbar" id="n2">
              <a href="#nn2">Navbar</a>
            </li>
            <li className="login" id="n3">
              <a href="#nn3">Log In</a>
            </li>
            <li className="signup" id="n4">
              <a href="#nn4">Sign Up</a>
            </li>
            <li className="joinmatchguest" id="n5">
              <a href="#nn5">Join Match as Guest</a>
            </li>
            <li className="watchmatch" id="n6">
              <a href="#nn6">Watch Match</a>
            </li>
            <li className="creatematch" id="n7">
              <a href="#nn7">Create New Match - Logged In</a>
            </li>
            <li className="joinmatch" id="n8">
              <a href="#nn8">Join Match - Logged In</a>
            </li>
            <li className="espectatematch" id="n9">
              <a href="#nn9">Espectate - Logged In</a>
            </li>
            <li className="profile" id="na">
              <a href="#nna">Profile</a>
            </li>
            <li className="waitingroomhost" id="nb">
              <a href="#nnb">Waiting Room - Host View</a>
            </li>
            <li className="waitingroom" id="nc">
              <a href="#nnc">Waiting Room - Guest View</a>
            </li>
            <li className="match" id="nd">
              <a href="#nnd">Match - Player View</a>
            </li>
            <li className="matchmovie" id="ne">
              <a href="#nne">Match - Espectator View</a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="nn1">
        {/* aca va el main page (antes characteristics) */}
        <h3> Main Page (Home)</h3>
        <h5>Frontend</h5>
        <h6>
          This is the landing page were the user first arrives. The user has to
          click one of the buttons in the navbar or go directly to the game by
          clicking the "join match as a guest" or "watch match" buttons. There's
          no interaction here with the backend, as no information is required or
          has been sent yet.
        </h6>
      </section>

      <section id="nn2">
        {/* aca va la navbar (antes game) */}
        <h3> Navbar</h3>

        <h5>Frontend</h5>
        <h6>
          {" "}
          Here the user can click one of the many options the navbar offers. You
          can press the DCConquer button to return to the home page, you can go
          to the "About" to get to know more about the DCConquer team, you can
          press the "Rules" button to read the main game rules, you can press
          the "Ranking" button to see the best players of the game, you can
          press the "Documentation" button to get right here and finally you can
          sign up or log in as a user. The navbar will follow the user travel
          throughout the website and will not change unless the user has already
          logged in. In this case, the frontend will ask the backend the
          username to make it part of the navbar, changing the buttons "Sign Up"
          and "Log in" for "Profile - username" and "Log out".
        </h6>
        <h5> Backend </h5>
        <h6>
          The backend will give the navbar the user's username in order to put
          it up there as soon as the user has logged in.
        </h6>
      </section>

      <section id="nn3">
        {/* aca va el log in (antes board) */}
        <h3> Log in</h3>
        <h5> Frontend </h5>
        <h6>
          The user enters his/her email adress and password. As soon as the user
          clicks the button "Log in", the frontend sends the input's values to
          the backend and waits for permission to go on.
        </h6>
        <h5> Backend </h5>
        <h6>
          The backend recieves the user's email and password and checks in the
          database if they are registered. If the credentials aren't valid, the
          backend sends to the frontend a message of access denied because of
          wrong email or password. Otherwise, the backend sends a message to the
          frontend welcoming the user and allowing him/her to go on.
        </h6>
      </section>

      <section id="nn4">
        {/* aca va el sign up (antes cards) */}
        <h3>Sign Up</h3>
        <h5>Frontend</h5>
        <h6>
          The user enters his/her real name, email, password, nickname and picks
          an avatar. This information will go to the backend to save the
          registration in the database. As soon as the user has entered the
          information, the frontend will start waiting for the backend's
          response.
        </h6>
        <h5>Backend</h5>
        <h6>
          The backend will check if the user's information is alright (for
          example, if the nickname is already taken). If everything is fine, it
          will asign the user an id and will save the information in the
          database. Then it will send the welcoming message and will allow
          him/her to go on as well. If there's a problem, the backend will deny
          the access and will send a message explaining what went wrong.
        </h6>
      </section>

      <section id="nn5">
        {/* aca va el join match as guest */}
        <h3>Join Match as guest</h3>
        <h5>Frontend</h5>
        <h6>
          This button will send a non-registered user to a page where he/she
          will be able to join a match. The button itself just redirects the
          user to another view, so there's no interaction frontend - backend.
        </h6>
      </section>

      <section id="nn6">
        {/* aca va el watch match */}
        <h3>Watch Match</h3>
        <h5>Frontend</h5>
        <h6>
          This button will send a non-registered user to a page where he/she
          will be able to watch a match. The button itself just redirects the
          user to another view, so there's no interaction frontend - backend.
        </h6>
      </section>

      <section id="nn7">
        {/* aca va el create new match (logged in) */}
        <h3>Create New Match (logged in)</h3>
        <h5>Frontend</h5>
        <h6>
          In this view the user will be able to host a match. In order to do it,
          first it's necessary to enter the match name, the max number of
          players allowed (2-6) and the amount of cards each player will have at
          the beggining of the match. This information will be sent to the
          backend and then will wait for the response.
        </h6>
        <h5>Backend</h5>
        <h6>
          The backend will recieve the match information and will check if
          everything it's in order. Then, it will save the party in the database
          and send the message of allowance to the frontend. It will be
          listening if new players join this match.
        </h6>
      </section>

      <section id="nn8">
        {/* aca va el Join match (logged in) */}
        <h3>Join Match (logged in)</h3>
        <h5>Frontend</h5>
        <h6>
          The frontend will ask for the possible matches that the user can join,
          information that will be provided by the backend. It will display the
          possible matches in this view, where the user will be able to join by
          clicking them. Once the user clicked the match that wants to join, it
          will send the backend a permission to join. Then, the frontend will
          wait for the response.
        </h6>
        <h5>Backend</h5>
        <h6>
          In first place, once the user enters this view, the backend will send
          to the frontend all the available matches. When the backend receives
          the information of the user trying to join a specific match, it will
          check if there's still room in it. Then, if everything is allright,
          the backend will register the user to the match and will give him/her
          access to the match waiting room.
        </h6>
      </section>

      <section id="nn9">
        {/* aca va el Espectate Match (logged in) */}
        <h3>Espectate Match (logged in)</h3>
        <h5>Frontend</h5>
        <h6>
          The frontend will ask for the possible matches that the user can join
          AS A VIEWER, information that will be provided by the backend. It will
          display the possible matches in this view, where the user will be able
          to join by clicking them. Once the user clicked the match that wants
          to join, it will send the backend a permission request. Then, the
          frontend will wait for the response.
        </h6>
        <h5>Backend</h5>
        <h6>
          In first place, once the user enters this view, the backend will send
          to the frontend all the available matches. When the backend receives
          the information of the user trying to join a specific match and
          registers the user to the match. Finally, will give him/her access to
          the match waiting room, but no allowance to participate as a player.
        </h6>
      </section>

      <section id="nna">
        {/* aca va el profile (logged in) */}
        <h3>Profile (logged in)</h3>
        <h5>Frontend</h5>
        <h6>
          Once the user clicks the profile button in the navbar, it will
          redirect to a page that will show all the relevant personal
          information of the user. This data will be provided by the backend, so
          first the frontend will ask for it. Once received, it will display it
          in the page.
        </h6>
        <h5>Backend</h5>
        <h6>
          Once the frontend asks for the user's information, the backend will
          send all the information stored in the database about the user.
        </h6>
      </section>
      <section id="nnb">
        {/* aca va el waiting room host */}
        <h3>Waiting Room (Host view)</h3>
        <h5>Frontend</h5>
        <h6>
          Once the host user enters his/her waiting room, the frontend will
          show each player that has joined. This information will be provided by
          the backend, which will be actively listening if a player is trying to
          get in. The host user will be able to leave the match by pressing the
          "Leave Match" button, also will be able to accept/reject a player who
          is trying to enter the waiting room and kick them out once they are
          in. Every action the user does will be sent to the backend in order to
          manage the party development. Finally, when the host user wants to,
          he/she can start the game by pressing "Start" button.
        </h6>
        <h5>Backend</h5>
        <h6>
          The backend will be actively listening if a player wants to join the
          waiting room, if he/she's accepted/rejected/kicked out and if the
          match starts. For every action, the backend will be sending the
          corresponding answer to the frontend.
        </h6>
      </section>
      <section id="nnc">
        {/* aca va el waiting room guest view */}
        <h3>Waiting Room (Guest view)</h3>
        <h5>Frontend</h5>
        <h6>
          To get into the waiting room, the frontend will wait for the backend
          allowance. Once the player enters a waiting room, the frontend will
          show each player that has joined. This information will be provided by
          the backend, which will be actively listening if a player is trying to
          get in. The player will be able to leave the match by pressing the
          "Leave Match" button. The player will have to wait until the host
          user starts the match.
        </h6>
        <h5>Backend</h5>
        <h6>
          The backend will listen when a player wants to enter the waiting room,
          so it will send to the frontend a question if the host user accepts
          or rejects the incoming player. If the frontend information shows that
          the host accepted the new player, the backend will register him/her
          into the match database and will send the allowance to the frontend.
        </h6>
      </section>
      <section id="nnd">
        {/* aca va el waiting room guest view */}
        <h3>Match (Player View)</h3>
        <h5>Frontend</h5>
        <h6>
          Once inside a match, the players will be able to do many actions. In
          their respective turns, each player will be able to throw the dices,
          pick cards, move troops, build walls and ships, attack and defend
          their territories, etc. The frontend will be recieving information
          about which movements the player can do. All the turn information will
          be sent at the end of itself to the backend, so in the next turn every
          player will know what happened.
        </h6>
        <h5>Backend</h5>
        <h6>
          The backend will send the turn options to the respective user in
          his/her turn. At the same time, will be recieving the turn information
          and, when the backend gets the signal of "next turn", it will send to
          the frontend all the effects of the turn that has just happened. Then,
          each player will see what happened and the next turn will be assigned.
        </h6>
      </section>
      <section id="nne">
        {/* aca va el waiting room guest view */}
        <h3>Match (Espectator View)</h3>
        <h5>Frontend</h5>
        <h6>
          The espectator will be just seeing the changes once a turn ends, so
          there's not going to be any other frontend interaction more than
          leaving the match. There is not going to be frontend-backend
          interaction more than the one happening inside the game.
        </h6>
      </section>
    </body>
  );
}

export default Documentation;

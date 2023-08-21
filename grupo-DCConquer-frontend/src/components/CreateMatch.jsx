import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/create_match.css';
import axios from 'axios';
import { SERVER_URL } from '../App';

import useTokenAuth from '../hooks/useTokenAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Create_match() {
  const [matchName, setMatchName] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [startingCards, setStartingCards] = useState('');
  const { handleTokenChange } = useTokenAuth();

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    // user_email: Yup.string().email('Invalid email').required('Required'),
    matchName: Yup.string().required('Required'),
    minPlayers: Yup.number()
      .required('Required')
      .min(2, 'It must have at least 2 players')
      .max(6, 'It must have at maximum 6 players'),
    maxPlayers: Yup.number()
      .required('Required')
      .min(2, 'It must have at least 2 players')
      .max(6, 'It must have at maximum 6 players'),
    startingCards: Yup.number()
      .required('Required')
      .min(1, 'You must assign at least 1 starting card')
      .max(4, 'You must assign at maximum 4 starting cards'),
  });

  const newGame = async (props) => {
    const url = `${SERVER_URL}/games`;
    const body = {
      name: props.matchName,
      min_players: props.minPlayers,
      max_players: props.maxPlayers,
      starting_cards: props.startingCards,
      active: false,
      winner_id: -1,
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
        if (response.status === 201) {
          // handleTokenChange(response.data['token']);
          window.location.href = `waiting_room_host/${response.data.id}`;
        }
      })
      .catch((error) =>
        alert(`[${error.response.status}] ${error.response.data}`),
      );
  };

  return (
    <div className="create-match-style">
      <Navbar />
      <Formik
        initialValues={{
          matchName: '',
          minPlayers: '',
          maxPlayers: '',
          startingCards: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          newGame(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="general-grid">
            <div className="general-grid-items sign-up">Create Match</div>
            <Form className="form-grid">
              <div className="general-grid-items inner-grid-1">
                {/* <p>{signupStatus}</p> */}
                <br />
                <div className="general-grid-items inner-grid-items">
                  Match Name
                </div>
                <Field
                  type="text"
                  name="matchName"
                  id="matchName"
                  className="form_input"
                />
                <ErrorMessage name="matchName" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Min Players (2-6)
                </div>
                <Field
                  type="number"
                  name="minPlayers"
                  id="minPlayers"
                  className="form_input"
                  min="2"
                  max="6"
                />
                <ErrorMessage name="minPlayers" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Max Players (2-6)
                </div>
                <Field
                  type="number"
                  name="maxPlayers"
                  id="maxPlayers"
                  className="form_input"
                  min="2"
                  max="6"
                />
                <ErrorMessage name="maxPlayers" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Starting Cards (1-4)
                </div>
                <Field
                  type="number"
                  name="startingCards"
                  id="startingCards"
                  className="form_input"
                  min="1"
                  max="4"
                />
                <ErrorMessage name="startingCards" component="div" />
              </div>

              <div className="inner-grid-2">
                {/* <a href="/" className="button">
                Back
              </a> */}
                <button type="submit" className="button">
                  Continue
                </button>
              </div>
            </Form>
          </div>
          // <div className="label">
          //   <p>Create Match</p>
          // </div>
          // <div className="instructions">
          //   <div className="aa">
          //     <div className="input">
          //       <p>Match Name: </p>
          //       <input
          //         value={matchName}
          //         onChange={(e) => setMatchName(e.target.value)}
          //         type="text"
          //         name="firstName"
          //         required
          //       />
          //     </div>
          //     <div className="input">
          //       <p>Starting Cards: </p>
          //       <input
          //         value={startingCards}
          //         onChange={(e) => setStartingCards(e.target.value)}
          //         type="number"
          //         name="startingCards"
          //         min="0"
          //         max="6"
          //         required
          //       />
          //     </div>
          // <button className="continue" onClick={() => newGame()}>
          //   Continue
          // </button>
          //   </div>
          // </div>
        )}
      </Formik>
    </div>
  );
}

export default Create_match;

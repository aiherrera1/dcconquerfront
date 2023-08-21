import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/registration.css';
import axios from 'axios';
import { SERVER_URL } from '../App';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import SendRegistration from './miscellaneous/SendRegistration'

function Registration() {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    user_email: Yup.string().email('Invalid email').required('Required'),
    user_nickname: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    user_password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 characters minimum.')
      .matches(
        /^.*((?=.*[a-z]){1}).*$/,
        'Password must contain at least one lowercase',
      )
      .matches(
        /^.*((?=.*[A-Z]){1}).*$/,
        'Password must contain at least one uppercase',
      )
      .matches(/^.*(?=.*\d).*$/, 'Password must contain at least one number')
      .matches(
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
        'Password must contain at least one special character',
      ),
    user_password_confirmation: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('user_password'), null], 'Passwords must match'),
  });

  const sendRegistration = async (props) => {
    const url = `${SERVER_URL}/auth/signup`;
    const body = {
      email: props.user_email,
      password: props.user_password,
      username: props.user_nickname,
      avatar: selectedAvatar,
    };
    await axios
      .post(url, body)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          setSignupStatus(response.data.message);
          window.location.replace("./login");
        };
      })
      .catch((error) => {
        console.log(error);
        setSignupStatus(error.response.data.message);
      });
  };

  function changeAvatar(newAvatar) {
    let oldAvatar = document.getElementsByClassName('lightened-avatar');
    if (oldAvatar[0]) {
      oldAvatar[0].className = 'unlightened-avatar';
    }
    setSelectedAvatar(`${newAvatar}.png`);
    console.log(`${selectedAvatar} --> ${newAvatar}.png`);
    let avatar = document.getElementById(newAvatar);
    avatar.className = 'lightened-avatar';
  }

  useEffect(() => {
    changeAvatar('aztecs');
  }, []);
  return (
    <div className="registration-style">
      <Navbar />
      <Formik
        initialValues={{
          user_email: '',
          user_nickname: '',
          user_password: '',
          user_password_confirmation: '',
          user_avatar: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          sendRegistration(values);
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="general-grid">
            <div className="general-grid-items sign-up">Sign Up</div>
            <Form className="form-grid">
              <div className="general-grid-items inner-grid-1">
                <p>{signupStatus}</p>
                <br />
                {/* <div className="general-grid-items inner-grid-items">Name</div>
                <input type="text" name="user_name" id="user_name" className="form_input"/>
                <br /> */}
                <div className="general-grid-items inner-grid-items">Email</div>
                <Field
                  type="email"
                  name="user_email"
                  id="user_email"
                  className="form_input"
                />
                <ErrorMessage name="user_email" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Nickname
                </div>
                <Field
                  type="text"
                  name="user_nickname"
                  id="user_nickname"
                  className="form_input"
                />
                <ErrorMessage name="user_nickname" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Password
                </div>
                <Field
                  type="password"
                  name="user_password"
                  id="user_password"
                  className="form_input"
                />
                <ErrorMessage name="user_password" component="div" />
                <br />
                <div className="general-grid-items inner-grid-items">
                  Password Confirmation
                </div>
                <Field
                  type="password"
                  name="user_password_confirmation"
                  id="user_password_confirmation"
                  className="form_input"
                />
                <ErrorMessage
                  name="user_password_confirmation"
                  component="div"
                />
              </div>
              <div className="general-grid-items inner-grid-1">
                <div className="general-grid-items inner-grid-items">
                  Avatar
                </div>
                <div className="inner-grid-3">
                  <div
                    id="aztecs"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('aztecs')}
                  >
                    <img
                      src={require('../assets/images/avatars/aztecs.png')}
                      alt="Aztecs avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Aztecs</span>
                  </div>
                  <div
                    id="barbarians"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('barbarians')}
                  >
                    <img
                      src={require('../assets/images/avatars/barbarians.png')}
                      alt="Barbarians avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Barbarians</span>
                  </div>
                  <div
                    id="crusader_knights"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('crusader_knights')}
                  >
                    <img
                      src={require('../assets/images/avatars/crusader_knights.png')}
                      alt="Crusader Knights avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name long-avatar-names">
                      Crusader Knights
                    </span>
                  </div>
                  <div
                    id="dora_milajes"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('dora_milajes')}
                  >
                    <img
                      src={require('../assets/images/avatars/dora_milajes.png')}
                      alt="Dora Milajes avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name long-avatar-names">
                      Dora Milajes
                    </span>
                  </div>
                  <div
                    id="mongols"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('mongols')}
                  >
                    <img
                      src={require('../assets/images/avatars/mongols.png')}
                      alt="Mongols avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Mongols</span>
                  </div>
                  <div
                    id="native_americans"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('native_americans')}
                  >
                    <img
                      src={require('../assets/images/avatars/native_americans.png')}
                      alt="Native Americans avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name long-avatar-names">
                      Native Americans
                    </span>
                  </div>
                  <div
                    id="polynesians"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('polynesians')}
                  >
                    <img
                      src={require('../assets/images/avatars/polynesians.png')}
                      alt="Polynesians avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Polynesians</span>
                  </div>
                  <div
                    id="romans"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('romans')}
                  >
                    <img
                      src={require('../assets/images/avatars/romans.png')}
                      alt="Romans avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Romans</span>
                  </div>
                  <div
                    id="spanish_conquistadors"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('spanish_conquistadors')}
                  >
                    <img
                      src={require('../assets/images/avatars/spanish_conquistadors.png')}
                      alt="Spanish Conquistadors avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name long-avatar-names">
                      Spanish Conquistadors
                    </span>
                  </div>
                  <div
                    id="vikings"
                    className="unlightened-avatar"
                    onClick={() => changeAvatar('vikings')}
                  >
                    <img
                      src={require('../assets/images/avatars/vikings.png')}
                      alt="Vikings avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name">Vikings</span>
                  </div>
                  {/* <div id="own_avatar" className="unlightened-avatar">
                    <img
                      src={require("../assets/images/avatars/own_avatar.png")}
                      alt="Upload your avatar"
                      className="avatars-img"
                    />
                    <br />
                    <span className="avatars-name long-avatar-names">
                      Upload your own
                    </span>
                  </div> */}
                </div>
              </div>
              <div className="inner-grid-2">
                <a href="/" className="button">
                  Back
                </a>
                <button type="submit" className="button">
                  Create User
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

// module.exports = Registration
export default Registration;

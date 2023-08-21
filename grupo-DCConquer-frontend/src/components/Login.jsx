import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/login.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCookieAuth from '../hooks/useCookieAuth';
import { SERVER_URL } from '../App';
import useTokenAuth from '../hooks/useTokenAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  const [loginStatus, setLoginStatus] = useState('');

  // const [cookies, setCookie] = useCookies(["cookie-name"]);
  const { handleUserLogin } = useCookieAuth();
  const { handleTokenChange } = useTokenAuth();

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    user_email: Yup.string().email('Invalid email').required('Required'),
    user_password: Yup.string().required('No password provided'),
  });

  const sendLogin = async (props) => {
    const url = `${SERVER_URL}/auth/login`;
    const body = {
      email: props.user_email,
      password: props.user_password,
    };
    await axios
      .post(url, body)
      .then((response) => {
        console.log(response);
        if (response.status < 300) {
          console.log('hi', response);
          console.log(response.data['token']);
          handleUserLogin();
          handleTokenChange(response.data['token'], 'login');
          setLoginStatus(response.data.username);
          navigate('/');
          // window.location.replace('./');
        }
      })
      .catch((error) => {
        // alert(`[${error.response.status}] ${error.response.data}`)
        setLoginStatus(error.response.data.message);
        console.log(error);
      });
  };

  // useEffect(() => {
  //   axios.get(`${SERVER_URL}/login`).then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.username);
  //       // console.log(cookies["userid"]);
  //     }
  //     console.log(response);
  //   });
  // }, []);

  return (
    <div className="login-style">
      <Navbar />
      <Formik
        initialValues={{
          user_email: '',
          user_password: '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          sendLogin(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="general-grid">
            <div className="general-grid-items log-in">Log In</div>
            <Form className="form-grid">
              <div className="general-grid-items inner-grid-1">
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
                <p>{loginStatus}</p>
              </div>
              <div className="inner-grid-2">
                <a href="/" className="button">
                  Back
                </a>
                {/* <a href="/loged_in" className="button">Log In</a> */}
                {/* <input type="submit" value="Log In" className="button"></input> */}
                <button type="submit" className="button">
                  Log In
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

// module.exports = Login
// export default Login;

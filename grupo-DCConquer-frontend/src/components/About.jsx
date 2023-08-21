import React from 'react';
import Navbar from './Navbar';
import '../assets/styles/us.css';

function About() {
  return (
    <div className="about-style">
      <Navbar />
      <div className="background">
        <div className="about-section">
          <p>We are the DCConquer team and we're glad you're here! </p>
        </div>

        <br />

        <div className="row">
          <div className="column">
            <div className="card">
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <img
                      src={require('../assets/images/team/vicente_aburto/formal_vicho.JPG')}
                      alt="vicho formal"
                    />
                  </div>
                  <div className="flip-box-back">
                    <img
                      src={require('../assets/images/team/vicente_aburto/crazy_vicho.jpg')}
                      alt="vicho crazy"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <h2>Vicente Aburto</h2>
                <p>Major Software</p>
                <p>Minor Industrial</p>
                <p>vicente.aburto@uc.cl</p>
                <div className="contact">
                  <a
                    className="button"
                    href="https://www.instagram.com/vicente__aburto/"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <img
                      src={require('../assets/images/team/agustin_herrera/formal_herrera.jpg')}
                      alt="herrera formal"
                    />
                  </div>
                  <div className="flip-box-back">
                    <img
                      src={require('../assets/images/team/agustin_herrera/crazy_herrera.jpeg')}
                      alt="herrera crazy"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <h2>Agustín Herrera</h2>
                <p>Major Software</p>
                <p>Minor Data Science</p>
                <p>aiherrera1@uc.cl</p>
                <div className="contact">
                  <a
                    className="button"
                    href="https://www.instagram.com/agustin_herrerar/"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <img
                      src={require('../assets/images/team/agustin_suazo/foto_perfil.jpg')}
                      alt="agu formal"
                    />
                  </div>
                  <div className="flip-box-back">
                    <img
                      src={require('../assets/images/team/agustin_suazo/foto_troll.jpg')}
                      alt="agu crazy"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <h2>Agustín Suazo</h2>
                <p>Major Computación</p>
                <p>Minor Industrial</p>
                <p>agustn.suazo@uc.cl</p>
                <div className="contact">
                  <a
                    className="button"
                    href="https://www.instagram.com/agu_suazo/"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

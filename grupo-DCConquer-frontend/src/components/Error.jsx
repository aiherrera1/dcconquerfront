import React from "react";
// import Navbar from "./Navbar";
import "../assets/styles/error_page.css";


function Error() {
    return (
      <div className="error-style">
        {/* <Navbar /> */}
        <div className="background">
          <div className="error-section">
            <h1>Oops! Something went wrong... </h1>
          </div>
  
          <br />

          <div className="error-section">
          <img
            src={require("../assets/images/error_photo/que_paso.png")}
            alt="Que pasó ahora"
            />
          </div>
          <br />

          <div className="error-section">
             <h2><a href="/">Go back to Homepage</a></h2>
          </div>
          
  
        </div>
      </div>
    );
  }
  
export default Error;



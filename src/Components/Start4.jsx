import React from "react";
import { Link } from "react-router-dom";
export default function Start4() {
  return (
    <>
      <div className="start1">
        <div className="main3">
          <div className="logoskip">
            <Link to="/start3">
              <div className="backDiv">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/96/FFFFFF/back.png"
                  alt="back"
                />
              </div>
            </Link>
            <img src="images/upgraving_logo new (5).png" alt="start"></img>
            <Link to="/login2">
              <div className="skip"></div>
            </Link>
          </div>
        </div>
        <div className="start1text">
          <div>
            <h1>Get Started</h1>
          </div>
          <div>
            {" "}
            <p>
            Embark on Your Journey: Get Started to Explore a World of Possibilities!
            </p>
          </div>
        </div>
        <img id="start4-1img" src="images/sdd.png"></img>
        <img id="start4-2img" src="images/start4.png"></img>
        <div className="get-main">
          <Link to="/login2" id="get-btnst" className="get-started-btn">
            {" "}
            <button id="getbtn">Get Started</button> <img id="btnimg"
            src="https://img.icons8.com/ios-glyphs/96/FFFFFF/forward.png"
            alt="forward"
          />
          </Link>
        </div>
      </div>
    </>
  );
}

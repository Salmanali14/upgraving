import React from "react";
import { Link } from "react-router-dom";
export default function Start3() {
  return (
    <>
      <div className="start1">
        <div className="main3">
          <div className="logoskip">
            <Link to="/start2">
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
              <div className="skip">Skip</div>
            </Link>
          </div>
        </div>
        <div className="start1text">
          <div>
            <h1>Insights at Your Fingertips</h1>
          </div>
          <div>
            {" "}
            <p>
            Track Your Impact: Stay Informed with Analytics on New Connections, Total Clicks, and Link Clicks – Empowering Your Networking Journey!
            </p>
          </div>
        </div>
        <img id="start3-1img" src="images/cuate.png"></img>
        <img id="start3-2img" src="images/start3.png"></img>
        <div className="nextmain">
          <div id="next_btn_div">
          <Link to="/start4"> <img
              id="nextbuttonicon"
              src="https://img.icons8.com/ios-glyphs/96/FFFFFF/forward.png"
              alt="forward"
            /></Link>
          </div>
          <Link to="/start4" className="nextbtnstyle">
            {" "}
            <button>Next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

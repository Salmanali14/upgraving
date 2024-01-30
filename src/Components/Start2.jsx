import React from "react";
import { Link } from "react-router-dom";
export default function Start2() {
  return (
    <>
      <div className="start1">
        <div className="main3">
          <div className="logoskip">
            <Link to="/start1">
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
            <h1>Exchange Contact</h1>
          </div>
          <div>
            {" "}
            <p>
            Connect Seamlessly: Exchange Contacts and Foster Meaningful Connections with other people!
            </p>
          </div>
        </div>
        <img id="start2-1img" src="images/amico.png"></img>
        <img id="start2-2img" src="images/start2.png"></img>
        <div className="nextmain">
          <div id="next_btn_div">
          <Link to="/start3">  <img
              id="nextbuttonicon"
              src="https://img.icons8.com/ios-glyphs/96/FFFFFF/forward.png"
              alt="forward"
            /></Link>
          </div>
          <Link to="/start3" className="nextbtnstyle">
            {" "}
            <button>Next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

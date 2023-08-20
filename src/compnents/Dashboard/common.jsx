import React, { useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import "./common.css"


const Common = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleIconClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="cardHeading">
        <h3>{props.title}</h3>
        <MoreVertOutlinedIcon className="headingIcon" onClick={handleIconClick} />
      </div>

      {isPopupOpen && (
        <div className="popupContainer">
          <div className="popupBackground" onClick={closePopup}></div>
          <div className="popupContent">
            {props.popupTitle}
            {props.popupContent} {/* Render the provided popup content */}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Common;
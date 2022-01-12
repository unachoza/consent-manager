//@ts-nocheck
import React from 'react';
import './Tooltip.scss';

const Tooltip = ({ toggling, text }) => {
  console.log(toggling)
  return (
    <div className="info-modal-container">
      <div className="modal-container show-modal" id="modal ">
        <div className="modal">
          <img
            src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1619580778/icons8-macos-close-32.png"
            className="close-icon"
            onClick={toggling}
            alt="close icon"
          />
          <div className="modal-header">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;

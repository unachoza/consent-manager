
//@ts-nocheck
import React from "react";
import "./ToggleSwitch.css";
  
const ToggleSwitch = ({ key, label, value, name, checked, onChange }) => {
  console.log({value}, 'of ads')
  return (
    <div className="container">
      <div className="toggle-switch">
        <input
             type="checkbox"
             name={label}
             className="checkbox"
             id={label}
             checked={checked}
             onChange={e => onChange(e.target.checked)}
          
          // type="checkbox" className="checkbox" 
          // name={label} id={label}
        />
        <label className="label" htmlFor={label} name={label} value={value} name={label}>
          <span className="inner"  data-yes="YES" data-no="NO"/>
          <span className="switch" />
        </label>
      </div>
      <div className="label-container">

      {label}{" "}
      </div>
    </div>
  );
};
  
export default ToggleSwitch;
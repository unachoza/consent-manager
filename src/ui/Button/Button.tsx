//@ts-nocheck
import React from 'react';
// import type { TranscendAPI } from '../../@types/airgap.js';
import './Button.css';

//JSX.Element
const Button = ({ text, onClick }) => {
  return <div className="button" onClick={onClick}>{text}</div>;
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

function Header(props) {
  return (
  	<div className="App-header" onClick={props.onClick} onMouseMove={props.onMouseMove}>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="HeaderTitle">SIH Debugger</h1>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
};

export default Header;

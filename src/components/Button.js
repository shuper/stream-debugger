import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button id={props.id} className="ui-Button" type="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

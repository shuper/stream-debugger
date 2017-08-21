import React from 'react';
import PropTypes from 'prop-types';

function Label(props) {
  return (
    <span id={props.id} className="Label" >
      {props.text}
    </span>
  );
}

Label.propTypes = {
	id: PropTypes.string,
  text: PropTypes.string,
};

export default Label;
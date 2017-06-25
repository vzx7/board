import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => <input data-id={props.elId} type="button" onClick={props.handleClick} className={`${props.type} utl`} defaultValue={props.type}/>

Button.propTypes = {
  elId: PropTypes.number,
  handleClick: PropTypes.func,
  type: PropTypes.string.isRequired
}

export default Button
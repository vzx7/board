import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (<input data-id={this.props.elId} type="button" onClick={this.props.onClick} className={`${this.props.type} utl`} defaultValue={this.props.type}/>);
  }
}

Button.propTypes = {
  elId: PropTypes.number,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired
}

export default Button
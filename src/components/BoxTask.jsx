import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const BoxTask = (props) => {
    return <div className="box_task">
              <span data-id={props.elId} className="span_content">{props.task}</span>
              <input type="text" data-id={props.elId} className="input_content" defaultValue={props.task} />
              <Button elId={props.elId} handleClick={props.handleClick} type="edit"/>
              <Button elId={props.elId} handleClick={props.handleClick} type="del"/>
              <Button elId={props.elId} handleClick={props.handleClick} type="save"/>
          </div>
}

BoxTask.propTypes = {
  elId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default BoxTask;

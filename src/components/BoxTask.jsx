import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


class BoxTask extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div className="box_task">
              <span data-id={this.props.elId} className="span_content">{this.props.task}</span>
              <input type="text" data-id={this.props.elId} className="input_content" defaultValue={this.props.task} />
              <Button elId={this.props.elId} onClick={this.props.setEdit} type="edit"/>
              <Button elId={this.props.elId} onClick={this.props.onDelete} type="del"/>
              <Button elId={this.props.elId} onClick={this.props.onSave} type="save"/>
          </div>
  }
}

BoxTask.propTypes = {
  elId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  setEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default BoxTask;

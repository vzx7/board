import React from 'react';
import BoxTask from './BoxTask';
import Button from './Button';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-drag-and-drop'



class Tr extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return  <tr>
          <th scope="row">{this.props.number}</th>
            <td>
              <div className="_task_start task">
                <Button onClick={this.props.handleShowInput} type="add"/>
                <div className="box_add">
                  <input type="text" className="new_task input_content" />
                  <Button onClick={this.props.handleSave} type="save"/>
                </div>
              </div>
              <div className="_task_new">
                {this.props.new
                  ? 
                  <Draggable type="drag" data={this.props.new.id}>
                    <BoxTask 
                      elId={this.props.new.id} 
                      setEdit={this.props.handleEdit} 
                      onDelete={this.props.handleDelete} 
                      onSave={this.props.handleSave} 
                      task={this.props.new.task} />
                  </Draggable>
                  :  ''}
              </div>
            </td>
            <td>
              <div className="task">
                {this.props.procces
                  ? 
                  <Draggable type="drag" data={this.props.procces.id}>
                    <BoxTask 
                      elId={this.props.procces.id} 
                      setEdit={this.props.handleEdit} 
                      onDelete={this.props.handleDelete} 
                      onSave={this.props.handleSave} 
                      task={this.props.procces.task} />
                  </Draggable>
                  :  
                  <Droppable
                    data-id="0"
                    types={['drag']} 
                    onDrop={this.props.getDragEl}
                    onDragEnter={this.props.getDropEl} />
                  }
              </div>
            </td>
            <td>
              <div className="task">
                {this.props.tests
                  ? 
                  <Draggable type="drag" data={this.props.tests.id}>
                    <BoxTask 
                      elId={this.props.tests.id} 
                      setEdit={this.props.handleEdit} 
                      onDelete={this.props.handleDelete} 
                      onSave={this.props.handleSave} 
                      task={this.props.tests.task} />
                  </Draggable> 
                  : 
                  <Droppable
                    data-id="1"
                    types={['drag']} 
                    onDrop={this.props.getDragEl}
                    onDragEnter={this.props.getDropEl} />}
              </div>
            </td>
            <td>
              <div className="task">
                {this.props.complited
                  ? 
                  <Draggable type="drag" data={this.props.complited.id}>
                    <BoxTask 
                      elId={this.props.complited.id} 
                      setEdit={this.props.handleEdit} 
                      onDelete={this.props.handleDelete} 
                      onSave={this.props.handleSave} 
                      task={this.props.complited.task} /> 
                  </Draggable>
                  : 
                  <Droppable
                    data-id="2"
                    types={['drag']} 
                    onDrop={this.props.getDragEl}
                    onDragEnter={this.props.getDropEl}/>}
              </div>
            </td>
        </tr>
  }
}

Tr.propTypes = {
  number: PropTypes.number.isRequired,
  getDragEl: PropTypes.func.isRequired,
  getDropEl: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleShowInput:  PropTypes.func,
  complited: PropTypes.object,
  tests: PropTypes.object,
  procces: PropTypes.object,
  new: PropTypes.object
};

export default Tr;
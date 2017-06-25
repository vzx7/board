import React from 'react';
import PropTypes from 'prop-types';
import easyBind from 'react-easy-bind';
import { Draggable, Droppable } from 'react-drag-and-drop'
import BoxTask from './BoxTask';
import Button from './Button';

class Tr extends React.Component {
  constructor (props) {
    super(props);
    this.dropType = 0
  }

  getDragEl(data) {
    this.props.handleDnD(+this.dropType, +data.drag)
  }

  getDropEl(e) {
    this.dropType = e.target.dataset.id;
  }

  handleClick(event) {
    switch (event.target.value) {
      case 'save':
        const parent = event.target.parentElement
        const inputTask = parent.querySelector('.input_content')
        if (!event.target.dataset.id) {
          if (inputTask.value && inputTask.value.trim() !== '') {
            this.props.handleSave(inputTask.value, inputTask.dataset.count)
          }
          inputTask.value = ''
        } else {
          if (inputTask.value && inputTask.value.trim() !== '') {
            this.props.handleEdit(inputTask.value, +event.target.dataset.id)
          }
        }
        this.setBoxTask(parent, 'save')
        break;

      case 'edit':
        this.setBoxTask(event.target.parentElement, 'edit')
        break;

      case 'del':
        this.props.handleDelete(+event.target.dataset.id)
        break;

      case 'add':
          const sibl = event.target.nextSibling
          sibl.style.display = 'block'
          this.setBoxTask(sibl, 'edit')
        break;
    
      default:
        break;
    }
  }

  setBoxTask (parent, type) {
    const span = parent.querySelector('.span_content')
    parent.querySelector('.input_content').style.display = type === 'edit' ? 'block' : 'none'
    if (span) span.style.display = type === 'edit' ? 'none' : 'block'
    parent.querySelector('.save').style.display = type === 'edit' ? 'block' : 'none'
  }

  render () {
    return  <tr>
          <th scope="row">{this.props.number}</th>
            <td>
              <div className="_task_start task">
                <Button handleClick={this.handleClick} type="add"/>
                <div className="box_add">
                  <input type="text" className="new_task input_content" data-count={this.props.count} />
                  <Button handleClick={this.handleClick} type="save"/>
                </div>
              </div>
              <div className="_task_new">
                {this.props.new
                  ? 
                  <Draggable type="drag" data={this.props.new.id}>
                    <BoxTask 
                      elId={this.props.new.id} 
                      handleClick={this.handleClick} 
                      task={this.props.new.task} />
                  </Draggable>
                  :  ''}
              </div>
            </td>
            <td>
              <div className="task">
                {this.props.process
                  ? 
                  <Draggable type="drag" data={this.props.process.id}>
                    <BoxTask 
                      elId={this.props.process.id} 
                      handleClick={this.handleClick} 
                      task={this.props.process.task} />
                  </Draggable>
                  :  
                  <Droppable
                    data-id="0"
                    types={['drag']} 
                    onDrop={this.getDragEl}
                    onDragEnter={this.getDropEl} />
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
                      handleClick={this.handleClick}  
                      task={this.props.tests.task} />
                  </Draggable> 
                  : 
                  <Droppable
                    data-id="1"
                    types={['drag']} 
                    onDrop={this.getDragEl}
                    onDragEnter={this.getDropEl} />}
              </div>
            </td>
            <td>
              <div className="task">
                {this.props.complited
                  ? 
                  <Draggable type="drag" data={this.props.complited.id}>
                    <BoxTask 
                      elId={this.props.complited.id} 
                      handleClick={this.handleClick} 
                      task={this.props.complited.task} /> 
                  </Draggable>
                  : 
                  <Droppable
                    data-id="2"
                    types={['drag']} 
                    onDrop={this.getDragEl}
                    onDragEnter={this.getDropEl}/>}
              </div>
            </td>
        </tr>
  }
}

Tr.propTypes = {
  number: PropTypes.number.isRequired,
  handleDnD: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  complited: PropTypes.object,
  tests: PropTypes.object,
  process: PropTypes.object,
  new: PropTypes.object
};

export default easyBind(Tr);
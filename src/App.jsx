import React from 'react';
import PropTypes from 'prop-types';
import easyBind from 'react-easy-bind';
import { connect } from 'react-redux';
// Компоненты
import Button from './components/Button';
import Tr from './components/Tr';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { 
        tasks: this.props.tasks,
        count: this.props.tasks.length
    };
    this.dropType = 0
  }

  handleShowInput (that) {
    const sibl = that.target.nextSibling
    sibl.style.display = 'block'
    this.setBoxTask(sibl, 'edit')
  }

  handleEdit (that) {
    this.setBoxTask(that.target.parentElement, 'edit')
  }

  handleDelete (that) {
    const tasks = this.state.tasks.filter(task => task.id !== +that.target.dataset.id)
    this.setState({tasks, count: tasks.length})
  }

  handleSave (that) {
    let tasks = this.state.tasks;
    const parent = that.target.parentElement
    let count = 0

    if (!that.target.dataset.id) {
      const newTask = parent.querySelector('.input_content')
      if (newTask.value && newTask.value.trim() !== '') { 
        count = ++this.state.count
        tasks.push({
          id: count,
          task: newTask.value,
          status: -1
        })
      } else count = this.state.count
      newTask.value = ''
    } else {
      const input = parent.querySelector('.input_content')
      if (input.value && input.value.trim() !== '') {
        tasks.map(task => {
          if (task.id === +that.target.dataset.id) {
            task.task = input.value
          }
        })
        count = ++this.state.count
      } else count = this.state.count
    }
    this.setBoxTask(parent, 'save')
    this.setState({ tasks, count })
  }

  getDragEl(data) {
    let tasks = this.state.tasks;
    tasks.map(task => {
      if (task.id === +data.drag) {
        task.status = +this.dropType
      }
    })

    this.setState({ tasks })
  }

  getDropEl(e) {
    this.dropType = e.target.dataset.id;
  }

  setBoxTask (parent, type) {
    const span = parent.querySelector('.span_content')
    parent.querySelector('.input_content').style.display = type === 'edit' ? 'block' : 'none'
    if (span) span.style.display = type === 'edit' ? 'none' : 'block'
    parent.querySelector('.save').style.display = type === 'edit' ? 'block' : 'none'
  }

  setArrTasksType (tasks, status) {
    return tasks.filter(task => task.status === status)
  }

  showTascsList () {
    const getstatus = status => {
      if (status === 0) return 'в процессе'
      else if (status === 1) return 'тестирование'
      else if (status === 2) return 'готово'
      else if (status === -1) return 'в стадии написания'
    }
    const ul = document.createElement('ul')
    tasks_list.innerHTML = ''
    this.state.tasks.sort((a, b) => {
      if (a.status > b.status) return 1
      else if (a.status < b.status) return -1
      else return 0
    }).map(task => {
      let li = document.createElement('li')
      li.innerHTML = `id: ${task.id} - "${task.task}" (${getstatus(task.status)})`
      ul.appendChild(li)
      console.log(li.textContent)
    })
    tasks_list.appendChild(ul)
    tasks_list.style.display = 'block'
  }

  handleTasksList (tasks) {
    const tasksInProcess = this.setArrTasksType(tasks, 0)
    const tasksForTest = this.setArrTasksType(tasks, 1)
    const tasksComplited = this.setArrTasksType(tasks, 2)
    const tasksNew = this.setArrTasksType(tasks, -1)
    const countProcess = tasksInProcess.length
    const countTest = tasksForTest.length
    const countComplited = tasksComplited.length
    const countNew = tasksNew.length
    let arr = []

    for (let i = 1; i <= countProcess || i <= countTest || i <= countComplited || i <= countNew; i++) {
      arr.push(<Tr 
          key={i}
          number={i}
          handleShowInput={this.handleShowInput}
          handleSave={this.handleSave}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          getDragEl={this.getDragEl}
          getDropEl={this.getDropEl}
          new={tasksNew.shift()}
          procces={tasksInProcess.shift()}
          tests={tasksForTest.shift()}
          complited={tasksComplited.shift()}
       />)
    }

    //if ((this.state.count - countNew) % 3 === 0) {
    const arrLen = arr.length
    if (countProcess === arrLen || countComplited === arrLen || countNew === arrLen || countTest === arrLen) {
      const len = ++arr.length
       arr.push(<Tr 
          key={len}
          number={len}
          getDragEl={this.getDragEl}
          getDropEl={this.getDropEl}
       />)
    }
    return arr
  }

  render () {
    return (
    <div id="all_box">
      <table className="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>todo</th>
                    <th>в процессе</th>
                    <th>тестирование</th>
                    <th>готово</th>
                </tr>
            </thead>
            <tbody className="content">
                { this.handleTasksList(this.state.tasks).map(tasks => tasks) }
            </tbody>
        </table>
        <Button onClick={this.showTascsList} type="show" />
        <div id="tasks_list" />
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default easyBind(App)

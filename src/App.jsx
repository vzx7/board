import React from 'react';
import PropTypes from 'prop-types';
import easyBind from 'react-easy-bind';
// Компоненты
import Button from './components/Button';
import Tr from './components/Tr';
// Методы редюсера
import { addTask, deleteTask, editTask, dndTask } from './actions'

class App extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.store = this.context.store
    this.dropType = 0
  }

  componentDidMount () {
    this.unsubscribe = this.store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleAddTask (task, count) {
    this.store.dispatch(addTask(task, count))
  }

  handleEditTask (task, id) {
    this.store.dispatch(editTask(task, id))
  }

  handleDeleteTask (id) {
    this.store.dispatch(deleteTask(id))
  }

  handleDnD(status, id) {
    this.store.dispatch(dndTask(status, id))
  }

  showTascsList () {
    const getstatus = status => {
      if (status === 0) return 'в процессе'
      else if (status === 1) return 'тестирование'
      else if (status === 2) return 'готова'
      else if (status === -1) return 'добавлена'
    }
    const ul = document.createElement('ul')
    tasks_list.innerHTML = ''
    this.store.getState().sort((a, b) => {
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
    const setArrTasksType = (tasks, status) => tasks.filter(task => task.status === status)
    const tasksInProcess = setArrTasksType(tasks, 0)
    const tasksForTest = setArrTasksType(tasks, 1)
    const tasksComplited = setArrTasksType(tasks, 2)
    const tasksNew = setArrTasksType(tasks, -1)
    const countProcess = tasksInProcess.length
    const countTest = tasksForTest.length
    const countComplited = tasksComplited.length
    const countNew = tasksNew.length
    const countTasks = tasks.length
    const arr = []

    for (let i = 1; i <= countProcess || i <= countTest || i <= countComplited || i <= countNew; i++) {
      arr.push(<Tr 
          key={i}
          number={i}
          count={countTasks}
          handleSave={this.handleAddTask}
          handleEdit={this.handleEditTask}
          handleDelete={this.handleDeleteTask}
          handleDnD={this.handleDnD}
          new={tasksNew.shift()}
          process={tasksInProcess.shift()}
          tests={tasksForTest.shift()}
          complited={tasksComplited.shift()}
       />)
    }

    const arrLen = arr.length
    if (countProcess === arrLen || countComplited === arrLen || countNew === arrLen || countTest === arrLen) {
      const len = ++arr.length
       arr.push(<Tr 
          key={len}
          number={len}
          count={countTasks}
          handleSave={this.handleAddTask}
          handleEdit={this.handleEditTask}
          handleDelete={this.handleDeleteTask}
          handleDnD={this.handleDnD}
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
                { this.handleTasksList(this.store.getState()).map(tasks => tasks) }
            </tbody>
        </table>
        <input onClick={this.showTascsList} type="button" className="show utl" value="show" />
        <div id="tasks_list" />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
}.propTypes = {
  store: PropTypes.object.isRequired
};

export default easyBind(App)

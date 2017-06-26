import React from 'react';
import PropTypes from 'prop-types';
import easyBind from 'react-easy-bind';
// Компоненты
import Tr from './Tr';

class App extends React.Component {

  showTasksList () {
    const getstatus = status => {
      if (status === 0) return 'в процессе';
      else if (status === 1) return 'тестирование';
      else if (status === 2) return 'готова';
      else if (status === -1) return 'добавлена';
    };
    const ul = document.createElement('ul');
    tasks_list.innerHTML = '';
    this.props.tasks.sort((a, b) => {
      if (a.status > b.status) return 1;
      else if (a.status < b.status) return -1;
      else return 0;
    }).map(task => {
      let li = document.createElement('li');
      li.innerHTML = `id: ${task.id} - "${task.task}" (${getstatus(task.status)})`;
      ul.appendChild(li);
      console.log(li.textContent);
    });
    tasks_list.appendChild(ul);
    tasks_list.style.display = 'block';
  }

  renderTasksList (tasks) {
    const setArrTasksType = (tasks, status) => tasks.filter(task => task.status === status);
    const tasksInProcess = setArrTasksType(tasks, 0);
    const tasksForTest = setArrTasksType(tasks, 1);
    const tasksComplited = setArrTasksType(tasks, 2);
    const tasksNew = setArrTasksType(tasks, -1);
    const countProcess = tasksInProcess.length;
    const countTest = tasksForTest.length;
    const countComplited = tasksComplited.length;
    const countNew = tasksNew.length;
    const countTasks = tasks.length;
    const arr = [];

    for (let i = 1; i <= countProcess || i <= countTest || i <= countComplited || i <= countNew; i++) {
      arr.push(<Tr
                 key={i}
                 number={i}
                 count={countTasks}
                 new={tasksNew.shift()}
                 handleSave={this.props.handleSave}
                 handleEdit={this.props.handleEdit}
                 handleDelete={this.props.handleDelete}
                 handleDnD={this.props.handleDnD}
                 process={tasksInProcess.shift()}
                 tests={tasksForTest.shift()}
                 complited={tasksComplited.shift()} />);
    }

    const arrLen = arr.length;
    if (countProcess === arrLen || countComplited === arrLen || countNew === arrLen || countTest === arrLen) {
      const len = ++arr.length;
      arr.push(<Tr
                 key={len}
                 number={len}
                 count={countTasks}
                 handleSave={this.props.handleSave}
                 handleEdit={this.props.handleEdit}
                 handleDelete={this.props.handleDelete}
                 handleDnD={this.props.handleDnD} />);
    }
    return arr;
  }

  addTask (event) {
    const parent = event.target.parentElement;
    const inputTask = parent.querySelector('.add_task');
      if (inputTask.value && inputTask.value.trim() !== '') {
        this.props.handleSave(inputTask.value, inputTask.dataset.count);
      }
      inputTask.value = '';
  }

  render () {
    return (
      <div id='all_box'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                todo
              </th>
              <th>
                в процессе
              </th>
              <th>
                тестирование
              </th>
              <th>
                готово
              </th>
            </tr>
          </thead>
          <tbody className='content'>
            {this.renderTasksList(this.props.tasks).map(tasks => tasks)}
          </tbody>
        </table>
        <div>
          <h3>Добавить задачу</h3>
          <input data-count={this.props.tasks.length} type="text" className="add_task" />
          <input
            onClick={this.addTask}
            type='button'
            className='show utl'
            value='save' />
        </div>
        <h3>Показать список задач</h3>
        <input
          onClick={this.showTasksList}
          type='button'
          className='show utl'
          value='show' />
          <div id='tasks_list' />
      </div>
    );
  }
}

export default easyBind(App);

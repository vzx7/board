import React from 'react'
import { connect } from 'react-redux'
import { addTask, deleteTask, editTask, dndTask } from '../actions'
import App from '../App'

const mapStateToProps = (state) => {
    return {
        tasks: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSave: (task, count) => dispatch(addTask(task, count)),
        handleEdit: (task, id) => dispatch(editTask(task, id)),
        handleDelete: id => dispatch(deleteTask(id)),
        handleDnD: (status, id) => dispatch(dndTask(status, id))
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer
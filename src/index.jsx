import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import reducer from './reducers'
import AppContainer from './containers/AppContainer'
// Эмуляция БД
import tasks from './tasks'
// Итеграция стилей SASS
import './sass/app.sass'

ReactDOM.render(
    <Provider store={createStore(reducer, tasks)} >
        <AppContainer />
    </Provider>, 
    document.getElementById('root')
);
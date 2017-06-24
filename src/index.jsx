import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
// Эмуляция БД
import tasks from './tasks'
// Итеграция стилей SASS
import './sass/app.sass'

ReactDOM.render(<App tasks={tasks} />, document.getElementById('root'));
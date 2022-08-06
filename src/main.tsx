import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { message } from 'antd'

window.addEventListener('unhandledrejection', e => {
  message.error(e.reason);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

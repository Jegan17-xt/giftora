import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import basePath from './utils/basePath'
import './utils/api'
import './styles/theme.css'
import './styles/app.css'
import './styles/admin-web.css'
import './styles/store.css'
import './styles/store-compact.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

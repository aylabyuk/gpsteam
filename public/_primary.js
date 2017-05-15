import { BrowserRouter } from 'react-router-dom'
import App from './App'

const primary = () => ((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))
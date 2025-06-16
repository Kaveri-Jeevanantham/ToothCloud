import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Home from './pages/Home/Home';
import './styles/global.css';

function App() {
  return (
    <Provider store={store}>  
      <Router>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

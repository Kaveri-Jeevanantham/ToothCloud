import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Home from './pages/Home/Home';

function App() {
  return (
    <Provider store={store}>  
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;

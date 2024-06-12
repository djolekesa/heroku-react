import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginForm />}>
              Login
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginForm />}>
              Login
            </Route>
            <Route path='/register' element={<RegisterForm />}>
              Register
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
};

export default App;

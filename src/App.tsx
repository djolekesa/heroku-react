import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Uploader from './components/Uploader';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginForm />}>
              Login
            </Route>
            <Route path='/upload' element={<Uploader />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
};

export default App;

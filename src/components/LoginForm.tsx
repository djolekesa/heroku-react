import React, { useState, FormEvent } from 'react';
import { AuthCredentials, login, updateImage } from '../services/dbService';
// @ts-ignore
import SimpleFileUpload from 'react-simple-file-upload';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);

  async function handleFile(url: string) {
    console.log('The URL of the file is ' + url);
    await updateImage(url, email);
  }

  const goToRegisterPage = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const credentials: AuthCredentials = { email, password };
    try {
      await login(credentials);
      setIsLoggedIn(true);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='app-container'>
      {!isLoggedIn ? (
        <div className='login-form'>
          <div> Please Login</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit'>Login</button>
            <button className='navigateToLogin' onClick={goToRegisterPage}>
              Go to register page
            </button>
          </form>
        </div>
      ) : (
        <div className='upload-form'>
          <header className='upload-title'>
            <h2>Upload your best photo</h2>
          </header>
          <div className='upload-wrapper'>
            <SimpleFileUpload
              apiKey={process.env.REACT_APP_FILE_UPLOAD_KEY}
              onSuccess={handleFile}
              preview={false}
            />
          </div>
          <button onClick={() => setShowUsers(!showUsers)}>
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
          {showUsers && <UserList />}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

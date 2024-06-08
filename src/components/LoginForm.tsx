import React, { useState, FormEvent } from 'react';
import { LoginCredentials, login, updateImage } from '../services/authService';
// @ts-ignore
import SimpleFileUpload from 'react-simple-file-upload';
import UserList from './UserList';

const LoginForm: React.FC = () => {
  console.log('ALOOO');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  async function handleFile(url: string) {
    console.log('The URL of the file is ' + url);
    await updateImage(url, email);
    setUploadedFile(url);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    const credentials: LoginCredentials = { email, password };
    try {
      const response = await login(credentials);
      // console.log('Login successful:', response);
      // Handle successful login here (e.g., save the token, redirect, etc.)
      setIsLoggedIn(true);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='app-container'>
      {!isLoggedIn ? (
        <div className='login-form'>
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
          </form>
        </div>
      ) : (
        <div className='upload-form'>
          <header className='upload-title'>
            <h2>Upload your best photo</h2>
          </header>
          <div className='upload-wrapper'>
            <SimpleFileUpload
              apiKey='96791e75c8d52ce4723813baa04d0d6b' // Move this to env file
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

import React, { useState, FormEvent } from 'react';
import { AuthCredentials, register } from '../services/dbService';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [registered, setRegistered] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const credentials: AuthCredentials = { email, password, username };
    try {
      await register(credentials);
      setEmail('');
      setUsername('');
      setPassword('');
      setRegistered(true);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className='app-container'>
      <div className='login-form'>
        <div> Please Register</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          {registered === false ? (
            <button type='submit'>Register user</button>
          ) : (
            <div>Successfully registered</div>
          )}
          <button className='navigateToLogin' onClick={goToLoginPage}>
            Go to login page
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

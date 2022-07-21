import React, { useState } from 'react';
import { signInUser } from '../../api/auth';
import { useAuth } from '../../context/authContext';
import RoundedButton from './RoundedButton';
import TextInput from './TextInput';

function LoginForm () {
  const { onSingIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    signInUser({ email, password })
      .then(_response => onSingIn())
      .catch(axiosError => {
        if (axiosError.response.status === 401) {
          setError('Invalid credentials');
        } else {
          setError('Something went wrong');
        }
      });
  };

  return (
    <div className='flex flex-col flex-grow justify-start items-center w-full'>
      <div className='pb-3 w-full'>
        <div className={`w-full bg-red-500 text-white hidden ${error && 'inline-flex'}`}>
            <p >{error}</p>
        </div>

        <div className='pb-3 w-full'>
          <TextInput
            required={true}
            labelName="Email"
            type="email"
            inputId="email"
            maxLength={50}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='pb-3 w-full'>
          <TextInput
            required={true}
            labelName="Password"
            type="password"
            inputId="password"
            maxLength={50}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <RoundedButton title="Iniciar sesión" onClick={handleSubmit}/>
    </div>
  );
}

export default LoginForm;

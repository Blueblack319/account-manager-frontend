import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, formState, handleSubmit, getValues } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = async () => {
    if (!loading) {
      try {
        const { email, password } = getValues();
        fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="email"
        required
        type="email"
        placeholder="Email"
        className="input"
      />
      <input
        {...register('password', { required: 'Password is required' })}
        required
        name="password"
        type="password"
        placeholder="Password"
        className="input"
      />
      <button>Sign in</button>
    </form>
  );
};

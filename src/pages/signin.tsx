import React from 'react';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useAuthActions, useAuthState } from '../context/authContext';

interface ILoginForm {
  email: string;
  password: string;
}

export const Signin = () => {
  const { loginError, isLoggingIn } = useAuthState();
  const { login } = useAuthActions();

  const {
    register,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
    getValues,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = async () => {
    if (!isLoggingIn) {
      const { email, password } = getValues();
      try {
        if (!(email && password)) {
          throw new Error('Cannot submit');
        }
        login(email, password);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full text-left font-medium text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
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
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register('password', { required: 'Password is required' })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}

          <Button
            canClick={isValid}
            loading={isSubmitting}
            actionText={'Log in'}
          />
          {loginError && <FormError errorMessage={loginError} />}
        </form>
        <div>
          New to Account manager?{' '}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../api/service/signup.api';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';

interface ICreateAccountForm {
  email: string;
  name: string;
  password: string;
}

export const CreateAccount = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(async () => {
    if (!isSubmitting && isSubmitted) {
      const { name, email, password } = getValues();
      try {
        if (!(name && email && password)) {
          throw new Error('Cannot submit');
        }
        const registerResponse = await signup(name, email, password);
        if (registerResponse) {
          const {
            user: { id },
            token,
          } = registerResponse;
          localStorage.setItem('userId', id);
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          setErrorMsg('Create account failed');
        }
      } catch (e: Error | any) {
        setErrorMsg(e.message);
        console.log(e);
      }
    }
  }, [getValues, isSubmitted, isSubmitting, navigate]);

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register('name', { required: 'Name is required' })}
            required
            name="name"
            type="string"
            placeholder="Name"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
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
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
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

          {/* ???????????? ????????? ?????????*/}
          {/* <label
            htmlFor="checked-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="checked-toggle"
              className="sr-only peer"
              {...register('isAnonym', {
                required: 'Selecting anonymity is required',
              })}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              ???????????? ???????????????????
            </span>
          </label>
          <label
            htmlFor="checked-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="checked-toggle"
              className="sr-only peer"
              {...register('isShared', {
                required: 'Selecting shared option is required',
              })}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              ?????? ???????????????????
            </span>
          </label> */}

          <Button
            canClick={isValid}
            loading={false}
            actionText={'Create Account'}
          />
          {errorMsg && <FormError errorMessage={errorMsg} />}
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};

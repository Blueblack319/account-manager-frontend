import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import editProfile from '../../api/service/edit-profile.api';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { useAuthState } from '../../utils/context/authContext';

interface IFormProps {
  email?: string;
  name?: string;
}

export const EditProfile = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { user } = useAuthState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: user?.email,
    },
  });

  const onSubmit = async () => {
    const { email, name } = getValues();
    try {
      if (!(email && name)) {
        throw new Error('Cannot submit');
      }
      const editProfileResponse = await editProfile(name, email);
      const { ok, error } = editProfileResponse;
      if (!ok && error) {
        setErrorMsg(error);
      }
    } catch (e: Error | any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register('email', {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register('name')}
          name="name"
          className="input"
          type="string"
          placeholder="Name"
        />
        <Button
          loading={isSubmitting}
          canClick={isValid}
          actionText="Save Profile"
        />
        {errorMsg && <FormError errorMessage={errorMsg} />}
      </form>
    </div>
  );
};

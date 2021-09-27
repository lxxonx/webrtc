import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useLoginStudentMutation } from '../generated/graphql';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo/localstate';
import { useHistory } from 'react-router-dom';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  height: 600px;
  margin: auto auto;
`;

type FormInputs = {
  username: string;
  password: string;
};

interface Props {}

function StudentLogin({}: Props): ReactElement {
  const history = useHistory();
  const [loginMutation] = useLoginStudentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { username, password } = data;
    await loginMutation({
      variables: {
        username,
        password,
      },
      update: (_, { data }) => {
        if (data?.loginStudent) {
          isLoggedInVar(true);
        }
      },
    });
  };
  const moveToTutorLoginOnClick = () => {
    history.push('/login/tutor');
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', { required: true })}
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        placeholder="username"
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        {...register('password', { required: true })}
        type="password"
        autoCapitalize="off"
        autoComplete="off"
        placeholder="password"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="button" onClick={moveToTutorLoginOnClick}>
        are you tutor?
      </button>
      <button type="submit">login</button>
    </Form>
  );
}

export default StudentLogin;

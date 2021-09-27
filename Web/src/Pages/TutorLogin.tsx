import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useLoginTutorMutation } from '../generated/graphql';
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

function TutorLogin({}: Props): ReactElement {
  const history = useHistory();
  const [loginMutation] = useLoginTutorMutation();

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
        if (data?.loginTutor) {
          isLoggedInVar(true);
        }
      },
    });
  };
  const moveToStudentLoginOnClick = () => {
    history.push('/login');
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
      <button type="button" onClick={moveToStudentLoginOnClick}>
        are you student?
      </button>
      <button type="submit">login</button>
    </Form>
  );
}

export default TutorLogin;

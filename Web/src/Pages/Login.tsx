import React, { ReactElement } from "react";
import styled from "styled-components";
import { useLoginMutation } from "../generated/graphql";
import { SubmitHandler, useForm } from "react-hook-form";
import { isLoggedInVar, meVar } from "../apollo/localstate";

const Form = styled("form")`
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

function Login({}: Props): ReactElement {
  const [loginMutation] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
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
        if (data?.login) {
          isLoggedInVar(true);
        }
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: true })}
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        placeholder="username"
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        {...register("password", { required: true })}
        type="password"
        autoCapitalize="off"
        autoComplete="off"
        placeholder="password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">login</button>
    </Form>
  );
}

export default Login;

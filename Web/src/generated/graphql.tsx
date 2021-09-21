import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['ID'];
  isCreated: Scalars['Boolean'];
  schedule: Scalars['DateTime'];
  student?: Maybe<User>;
  studentId?: Maybe<Scalars['Float']>;
  tutor: User;
  tutorId: Scalars['Float'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession: Class;
  createUser: User;
  deleteUserById: Scalars['Boolean'];
  login: User;
  updateStudent: Class;
};


export type MutationCreateSessionArgs = {
  schedule: Scalars['DateTime'];
};


export type MutationCreateUserArgs = {
  newUserData: NewUserInput;
};


export type MutationDeleteUserByIdArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateStudentArgs = {
  schedule: Scalars['DateTime'];
  studentId?: Maybe<Scalars['Float']>;
  tutorId?: Maybe<Scalars['Float']>;
};

export type NewUserInput = {
  birthYear: Scalars['Float'];
  firstname: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  leftClass?: Maybe<Scalars['Float']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getManyClassesByUser: Array<Class>;
  getManyUsers: Array<User>;
  getUserById: User;
  me?: Maybe<User>;
};


export type QueryGetManyUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  birthYear: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  isTutor: Scalars['Boolean'];
  lastname?: Maybe<Scalars['String']>;
  leftClass: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['ID'];
};

export type GetManyClassesByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetManyClassesByUserQuery = { __typename?: 'Query', getManyClassesByUser: Array<{ __typename?: 'Class', id: string, tutor: { __typename?: 'User', id: string, firstname: string } }> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, username: string, firstname: string, lastname?: Maybe<string>, birthYear: number, isTutor: boolean, leftClass: number } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, firstname: string, lastname?: Maybe<string>, birthYear: number, isTutor: boolean, leftClass: number }> };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, firstname: string, lastname?: Maybe<string>, birthYear: number, isTutor: boolean, leftClass: number };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  firstname
  lastname
  birthYear
  isTutor
  leftClass
}
    `;
export const GetManyClassesByUserDocument = gql`
    query GetManyClassesByUser {
  getManyClassesByUser {
    id
    tutor {
      id
      firstname
    }
  }
}
    `;
export type GetManyClassesByUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>, 'query'>;

    export const GetManyClassesByUserComponent = (props: GetManyClassesByUserComponentProps) => (
      <ApolloReactComponents.Query<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables> query={GetManyClassesByUserDocument} {...props} />
    );
    

/**
 * __useGetManyClassesByUserQuery__
 *
 * To run a query within a React component, call `useGetManyClassesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyClassesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyClassesByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetManyClassesByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>(GetManyClassesByUserDocument, options);
      }
export function useGetManyClassesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>(GetManyClassesByUserDocument, options);
        }
export type GetManyClassesByUserQueryHookResult = ReturnType<typeof useGetManyClassesByUserQuery>;
export type GetManyClassesByUserLazyQueryHookResult = ReturnType<typeof useGetManyClassesByUserLazyQuery>;
export type GetManyClassesByUserQueryResult = Apollo.QueryResult<GetManyClassesByUserQuery, GetManyClassesByUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(loginInput: {username: $username, password: $password}) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
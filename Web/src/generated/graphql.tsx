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
  messages: Array<Message>;
  schedule: Scalars['DateTime'];
  student?: Maybe<Student>;
  studentId?: Maybe<Scalars['Float']>;
  tutor: Tutor;
  tutorId: Scalars['Float'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  isTutor?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  class: Class;
  classId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: Class;
  createStudent: Student;
  createTutor: Tutor;
  loginStudent: Student;
  loginTutor: Tutor;
  logout: Scalars['Boolean'];
};


export type MutationCreateClassArgs = {
  schedule: Scalars['DateTime'];
};


export type MutationCreateStudentArgs = {
  newStudentData: NewUserInput;
};


export type MutationCreateTutorArgs = {
  newTutorData: NewUserInput;
};


export type MutationLoginStudentArgs = {
  loginInput: LoginInput;
};


export type MutationLoginTutorArgs = {
  loginInput: LoginInput;
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
  getManyClassesByTutor: Array<Class>;
  getStudentById: Student;
  getTutorById: Tutor;
  me: Tutor;
};


export type QueryGetStudentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetTutorByIdArgs = {
  id: Scalars['Float'];
};

export type Student = {
  __typename?: 'Student';
  birthYear: Scalars['Float'];
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  leftClass: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['ID'];
};

export type Tutor = {
  __typename?: 'Tutor';
  birthYear: Scalars['Float'];
  classes?: Maybe<Array<Class>>;
  createdAt: Scalars['DateTime'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type GetManyClassesByTutorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetManyClassesByTutorQuery = { __typename?: 'Query', getManyClassesByTutor: Array<{ __typename?: 'Class', id: string, tutor: { __typename?: 'Tutor', id: string, firstname: string } }> };

export type RegularStudentFragment = { __typename?: 'Student', id: string, username: string, firstname: string, lastname?: string | null | undefined, birthYear: number, leftClass: number };

export type StudentLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type StudentLoginMutation = { __typename?: 'Mutation', loginStudent: { __typename?: 'Student', id: string, username: string, firstname: string, lastname?: string | null | undefined, birthYear: number, leftClass: number } };

export type RegularTutorFragment = { __typename?: 'Tutor', id: string, username: string, firstname: string, lastname?: string | null | undefined, birthYear: number };

export type TutorLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TutorLoginMutation = { __typename?: 'Mutation', loginTutor: { __typename?: 'Tutor', id: string, username: string, firstname: string, lastname?: string | null | undefined, birthYear: number } };

export const RegularStudentFragmentDoc = gql`
    fragment RegularStudent on Student {
  id
  username
  firstname
  lastname
  birthYear
  leftClass
}
    `;
export const RegularTutorFragmentDoc = gql`
    fragment RegularTutor on Tutor {
  id
  username
  firstname
  lastname
  birthYear
}
    `;
export const GetManyClassesByTutorDocument = gql`
    query GetManyClassesByTutor {
  getManyClassesByTutor {
    id
    tutor {
      id
      firstname
    }
  }
}
    `;
export type GetManyClassesByTutorComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>, 'query'>;

    export const GetManyClassesByTutorComponent = (props: GetManyClassesByTutorComponentProps) => (
      <ApolloReactComponents.Query<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables> query={GetManyClassesByTutorDocument} {...props} />
    );
    

/**
 * __useGetManyClassesByTutorQuery__
 *
 * To run a query within a React component, call `useGetManyClassesByTutorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyClassesByTutorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyClassesByTutorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetManyClassesByTutorQuery(baseOptions?: Apollo.QueryHookOptions<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>(GetManyClassesByTutorDocument, options);
      }
export function useGetManyClassesByTutorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>(GetManyClassesByTutorDocument, options);
        }
export type GetManyClassesByTutorQueryHookResult = ReturnType<typeof useGetManyClassesByTutorQuery>;
export type GetManyClassesByTutorLazyQueryHookResult = ReturnType<typeof useGetManyClassesByTutorLazyQuery>;
export type GetManyClassesByTutorQueryResult = Apollo.QueryResult<GetManyClassesByTutorQuery, GetManyClassesByTutorQueryVariables>;
export const StudentLoginDocument = gql`
    mutation StudentLogin($username: String!, $password: String!) {
  loginStudent(loginInput: {username: $username, password: $password}) {
    ...RegularStudent
  }
}
    ${RegularStudentFragmentDoc}`;
export type StudentLoginMutationFn = Apollo.MutationFunction<StudentLoginMutation, StudentLoginMutationVariables>;
export type StudentLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<StudentLoginMutation, StudentLoginMutationVariables>, 'mutation'>;

    export const StudentLoginComponent = (props: StudentLoginComponentProps) => (
      <ApolloReactComponents.Mutation<StudentLoginMutation, StudentLoginMutationVariables> mutation={StudentLoginDocument} {...props} />
    );
    

/**
 * __useStudentLoginMutation__
 *
 * To run a mutation, you first call `useStudentLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudentLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studentLoginMutation, { data, loading, error }] = useStudentLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useStudentLoginMutation(baseOptions?: Apollo.MutationHookOptions<StudentLoginMutation, StudentLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StudentLoginMutation, StudentLoginMutationVariables>(StudentLoginDocument, options);
      }
export type StudentLoginMutationHookResult = ReturnType<typeof useStudentLoginMutation>;
export type StudentLoginMutationResult = Apollo.MutationResult<StudentLoginMutation>;
export type StudentLoginMutationOptions = Apollo.BaseMutationOptions<StudentLoginMutation, StudentLoginMutationVariables>;
export const TutorLoginDocument = gql`
    mutation TutorLogin($username: String!, $password: String!) {
  loginTutor(loginInput: {username: $username, password: $password}) {
    ...RegularTutor
  }
}
    ${RegularTutorFragmentDoc}`;
export type TutorLoginMutationFn = Apollo.MutationFunction<TutorLoginMutation, TutorLoginMutationVariables>;
export type TutorLoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<TutorLoginMutation, TutorLoginMutationVariables>, 'mutation'>;

    export const TutorLoginComponent = (props: TutorLoginComponentProps) => (
      <ApolloReactComponents.Mutation<TutorLoginMutation, TutorLoginMutationVariables> mutation={TutorLoginDocument} {...props} />
    );
    

/**
 * __useTutorLoginMutation__
 *
 * To run a mutation, you first call `useTutorLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTutorLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tutorLoginMutation, { data, loading, error }] = useTutorLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTutorLoginMutation(baseOptions?: Apollo.MutationHookOptions<TutorLoginMutation, TutorLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TutorLoginMutation, TutorLoginMutationVariables>(TutorLoginDocument, options);
      }
export type TutorLoginMutationHookResult = ReturnType<typeof useTutorLoginMutation>;
export type TutorLoginMutationResult = Apollo.MutationResult<TutorLoginMutation>;
export type TutorLoginMutationOptions = Apollo.BaseMutationOptions<TutorLoginMutation, TutorLoginMutationVariables>;
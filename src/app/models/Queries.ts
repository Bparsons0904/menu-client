import gql from 'graphql-tag';

/**
 * Query for getting current user
 */
export const getMe = gql`
  {
    me {
      id
      username
      email
      profile {
        firstName
        lastName
        role
      }
    }
  }
`;

/**
 * Query for getting current user
 */
export const getUsers = gql`
  {
    getUsers {
      username
      email
    }
  }
`;

/**
 * Mutation for registering user
 */
export const registerUser = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`;
/**
 * Mutation for getting current user
 */
export const loginUser = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(login: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

import gql from 'graphql-tag';

const profileFragment = `
  profile {
        id
        firstName
        lastName
        role
        email
        phone
        image
        title
      }
`;
const userFragment = `
  id
  username
  email
  ${profileFragment}
`;

/**
 * Query for getting current user
 */
export const getMe = gql`
  {
    getMe {
      ${userFragment}
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
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
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
      ${userFragment}
    }
  }
`;
/**
 * Mutation for changing user password
 */
export const changePassword = gql`
  mutation changePassword($id: String!, $password: String!) {
    changePassword(id: $id, password: $password) {
      token
      ${userFragment}
    }
  }
`;

/**
 * Mutation for sending a reset password
 */
export const resetPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

/**
 * Get the reset password token
 */
export const getResetToken = gql`
  query getResetToken($id: String!) {
    getResetToken(id: $id)
  }
`;

////////////////////////////////////////////////////////
// Profile Queries
////////////////////////////////////////////////////////

/**
 * Mutation for setting user profile
 */
export const createProfile = gql`
  mutation createProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Float!
    $image: String
    $title: String!
  ) {
    createProfile(
      createProfile: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        image: $image
        title: $title
      }
    ) {
      ${userFragment}
    }
  }
`;

/**
 * Mutation for setting user profile
 */
export const updateProfile = gql`
  mutation updateProfile(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Float!
    $image: String
    $title: String!
  ) {
    updateProfile(
      updateProfile: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        image: $image
        title: $title
      }
    )
  }
`;

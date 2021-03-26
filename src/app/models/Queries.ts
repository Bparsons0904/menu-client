import gql from 'graphql-tag';

/**
 * Query for getting current user
 */
export const getMe = gql`
  {
    getMe {
      id
      username
      email
      profile {
        id
        firstName
        lastName
        role
        email
        phone
        image
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
      user {
        id
        username
        email
        profile {
          firstName
          lastName
          role
          email
          phone
          image
        }
      }
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
      user {
        id
        username
        email
        profile {
          firstName
          lastName
          role
          email
          phone
          image
        }
      }
    }
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
      id
      username
      email
      profile {
        id
        firstName
        lastName
        role
        email
        phone
        image
      }
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

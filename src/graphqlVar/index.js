import { gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id, username, email
    }
  }
`;

export default { IS_LOGGED_IN, ME_QUERY };

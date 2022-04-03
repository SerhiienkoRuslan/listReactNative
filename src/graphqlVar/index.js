import { gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IS_ERROR = gql`
  query IsErrorFn {
    isError @client
  }
`;

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      _id
      name
      email
    }
  }
`;

export default { IS_LOGGED_IN, ME_QUERY, IS_ERROR };

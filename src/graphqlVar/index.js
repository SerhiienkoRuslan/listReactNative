import { gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default { IS_LOGGED_IN };

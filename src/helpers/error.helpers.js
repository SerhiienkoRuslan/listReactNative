import authHelpers from 'helpers/auth.helpers';
import graphqlVar from 'graphqlVar';

const UNAUTHENTICATED = 'UNAUTHENTICATED';

export default (dataErr, cache) => {
  const { graphQLErrors, networkError } = dataErr;

  if (graphQLErrors)
    graphQLErrors.map((err) => {
      const { message, extensions } = err;

      if (extensions?.code === UNAUTHENTICATED) {
        authHelpers.handleLogout(cache);
      }

      console.log(`[GraphQL error]: Message: ${message}`);
    });

  if (networkError) {
    cache.writeQuery({
      query: graphqlVar.IS_ERROR,
      data: {
        isError: true
      }
    });
  }
};

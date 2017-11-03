import gql from 'graphql-tag';

export default (apolloClient, user) => (
  apolloClient.query({
    query: gql`
      query getUser($id: ID!) {
        getUser(id:$id) {
          id
          username
          type
        }
      }
    `,
    variables: {
      id: user.id,
    },
  }).then(({ data }) => ({ loggedInUser: data.getUser }))
    .catch(() => ({ loggedInUser: null }))
);

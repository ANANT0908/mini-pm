import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP || 'http://localhost:8000/graphql',
  credentials: 'same-origin'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error('[GraphQL error]', err)
    }
  }
  if (networkError) {
    console.error('[Network error]', networkError)
  }
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client

import React from "react"
import ReactDOM from "react-dom"
import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
import Routers from "containers/Routers"

const host =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-example-202505.cloudfunctions.net"
    : "http://localhost:5000/example-202505/us-central1"

const httpLink = createHttpLink({
  uri: `${host}/app/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("id_token")

  if (!token) {
    return {
      headers,
    }
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <Routers />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById("root"))

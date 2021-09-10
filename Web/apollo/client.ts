import { ApolloClient, NormalizedCacheObject, split } from "@apollo/client";
import { cache } from "./localState";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client/link/http";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: false,
    connectionParams: () => {
      const token = localStorage.getItem("token");
      return {
        token: token ? `${token}` : "",
      };
    },
  },
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      token: token ? `${token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

export default client;

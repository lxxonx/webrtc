import { ApolloClient, NormalizedCacheObject, split } from "@apollo/client";
import { cache } from "./localstate";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpLink } from "@apollo/client/link/http";

const httpLink = new HttpLink({
  uri: "https://bumbalm-server.herokuapp.com/graphql",
  credentials: "include",
});
const wsLink = process.browser
  ? new WebSocketLink({
      uri: "wss://bumbalm-server.herokuapp.com/graphql",
      options: {
        reconnect: true,
      },
    })
  : null;

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink as any,
      httpLink
    )
  : httpLink;
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

export default client;

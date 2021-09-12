import { InMemoryCache, makeVar } from "@apollo/client";
import { RegularUserFragment } from "../generated/graphql";
import Cookies from "js-cookie";

export const isLoggedInVar = makeVar<boolean>(
  Cookies.get("token") === undefined ? false : true
);

export const meVar = makeVar<RegularUserFragment | null>(null);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

import { InMemoryCache, makeVar } from "@apollo/client";
import { RegularUserFragment } from "../generated/graphql";

export const isLoggedInVar = makeVar<boolean>(
  localStorage.getItem("token") === null ? false : true
);

export const meVar = makeVar<RegularUserFragment | null>(null);

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  isLoggedInVar(true);
  window.location.replace("/");
};
export const removeToken = () => {
  localStorage.removeItem("token");
  isLoggedInVar(false);
  window.location.replace("/");
};
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

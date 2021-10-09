import { InMemoryCache, makeVar } from "@apollo/client";
import {
  RegularTutorFragment,
  RegularStudentFragment,
} from "../generated/graphql";
import Cookies from "js-cookie";

export const isLoggedInVar = makeVar<boolean>(
  Cookies.get("token") === undefined ? false : true
);

export const meVar = makeVar<
  RegularTutorFragment | RegularStudentFragment | null
>(null);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

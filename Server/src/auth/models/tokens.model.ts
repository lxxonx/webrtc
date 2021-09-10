import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tokens {
  @Field()
  accessToken: String;
  @Field()
  refreshToken: String;
}

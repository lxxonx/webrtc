import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class StudentLoginInput {
  @Field()
  @MaxLength(20)
  username: string;

  @Field()
  @MaxLength(20)
  password: string;
}

import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  username: string;

  @Field()
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field()
  birthYear: number;

  @Field(() => Boolean)
  isTutor: boolean;

  @Field(() => Number)
  leftClass: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}

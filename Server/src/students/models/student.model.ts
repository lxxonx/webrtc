import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Student {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  username: string;

  @Field()
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field()
  birthYear: number;

  @Field(() => Number)
  leftSession: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}

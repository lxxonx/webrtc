import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/auth/models/user.model";

@ObjectType()
export class Session {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  videoUrl?: string;

  @Field(() => Date)
  schedule: Date;

  @Field(() => Number, { nullable: true })
  studentId?: number;

  @Field(() => User, { nullable: true })
  student?: User;

  @Field(() => Number)
  tutorId: number;

  @Field(() => User)
  tutor: User;

  @Field(() => Boolean)
  isCreated: boolean;
}

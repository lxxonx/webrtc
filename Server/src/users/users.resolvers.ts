import "reflect-metadata";
import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewUserInput } from "./Dto/new-user.input";
import { UsersArgs } from "./Dto/users.args";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Resolver(User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUserById(@Args("id") id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  getManyUsers(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args("newUserData") newUserData: NewUserInput
  ): Promise<User> {
    const recipe = await this.usersService.create(newUserData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async deleteUserById(@Args("id") id: number) {
    return this.usersService.remove(id);
  }
}

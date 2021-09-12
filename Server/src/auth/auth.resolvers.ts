import { NotFoundException } from "@nestjs/common";
import { Mutation, Args, Resolver, Context, Query } from "@nestjs/graphql";
import { User } from "src/auth/models/user.model";
import { AuthService } from "./auth.service";
import { LoginInput } from "./Dto/login.input";
import { NewUserInput } from "./Dto/new-user.input";
import { UsersArgs } from "./Dto/users.args";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  async getUserById(@Args("id") id: number): Promise<User> {
    const user = await this.authService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  getManyUsers(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.authService.findAll(usersArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args("newUserData") newUserData: NewUserInput
  ): Promise<User> {
    const recipe = await this.authService.create(newUserData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async deleteUserById(@Args("id") id: number) {
    return this.authService.remove(id);
  }
  @Query(() => User, { nullable: true })
  async me(@Context() { request }): Promise<User> | null {
    const token = request.cookies.refresh;
    if (!token) {
      return null;
    }
    const id = await this.authService.verifyToken(token);
    const user = await this.authService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(() => User)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() { response }
  ): Promise<User> {
    const { accessToken, refreshToken, id } = await this.authService.login(
      loginInput
    );
    response.setCookie("token", accessToken, {
      maxAge: 60 * 60 * 2,
    });
    response.setCookie("refresh", refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
    return this.authService.findOneById(id);
  }
}

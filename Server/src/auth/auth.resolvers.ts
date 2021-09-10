import { Mutation, Args, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./Dto/login.input";
import { Tokens } from "./models/tokens.model";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Tokens)
  async login(@Args("loginInput") loginInput: LoginInput): Promise<Tokens> {
    return this.authService.login(loginInput);
  }
}

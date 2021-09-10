import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as argon2 from "argon2";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./models/tokens.model";
import { LoginInput } from "./Dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async login(loginInput: LoginInput): Promise<Tokens> {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: {
          username: loginInput.username,
        },
      });
    } catch (e) {
      if (e.code === "P2021") {
        throw new NotFoundException("user not found");
      }
    }

    try {
      if (!argon2.verify(user.password, loginInput.password)) {
        throw new UnauthorizedException();
      }
      const accessToken = await this.jwt.signAsync(
        {
          username: loginInput.username,
        },
        { expiresIn: "15min", secret: loginInput.password }
      );
      const refreshToken = await this.jwt.signAsync(
        {
          username: loginInput.username,
        },
        { expiresIn: "7d", secret: loginInput.password }
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch {
      return null;
    }
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from "argon2";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { NewUserInput } from "./Dto/new-user.input";
import { UsersArgs } from "./Dto/users.args";
import { LoginInput } from "./Dto/login.input";
import { LoginResponse } from "./Dto/loginResponse.model";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async verifyToken(token: string): Promise<number> {
    const { id } = await this.jwt.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    return id;
  }
  async create({
    username,
    password,
    firstname,
    lastname,
    birthYear,
    leftClass,
  }: NewUserInput): Promise<User> {
    try {
      const hash = await argon2.hash(password);
      return this.prisma.user.create({
        data: {
          password: hash,
          username,
          firstname,
          lastname,
          birthYear,
          leftClass,
          isTutor: false,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user.deletedAt == null) {
      return user;
    }
    return null;
  }
  async findOneByToken(token: string): Promise<User> {
    const { id } = await this.jwt.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.deletedAt == null) {
      return user;
    }
    return null;
  }
  async findAll({ take, skip }: UsersArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
      return true;
    } catch {
      return false;
    }
  }
  async login(loginInput: LoginInput): Promise<LoginResponse> {
    let user: User;
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
      console.log(e);
    }

    try {
      if (!argon2.verify(user.password, loginInput.password)) {
        throw new UnauthorizedException();
      }
      const accessToken = await this.jwt.signAsync(
        {
          id: user.id,
        },
        { expiresIn: "2h", secret: process.env.JWT_ACCESS_TOKEN_SECRET }
      );
      const refreshToken = await this.jwt.signAsync(
        {
          id: user.id,
        },
        { expiresIn: "7d", secret: process.env.JWT_ACCESS_TOKEN_SECRET }
      );

      return {
        accessToken,
        refreshToken,
        id: user.id,
      };
    } catch {
      return null;
    }
  }
}

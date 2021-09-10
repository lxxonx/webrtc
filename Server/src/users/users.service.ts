import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { NewUserInput } from "./Dto/new-user.input";
import { UsersArgs } from "./Dto/users.args";
import { User } from "./models/user.model";
import * as argon2 from "argon2";
@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create({
    username,
    password,
    firstname,
    lastname,
    birthYear,
    leftSession,
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
          leftSession,
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
}

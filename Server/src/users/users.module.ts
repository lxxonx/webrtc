import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserResolver } from "./users.resolvers";
import { UsersService } from "./users.service";

@Module({
  providers: [UserResolver, UsersService, PrismaService],
})
export class UsersModule {}

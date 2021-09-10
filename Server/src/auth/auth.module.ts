import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { AuthResolver } from "./auth.resolvers";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, AuthResolver],
})
export class AuthModule {}

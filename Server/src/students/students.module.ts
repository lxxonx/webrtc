import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { StudentResolver } from "./students.resolvers";
import { StudentsService } from "./students.service";

@Module({
  providers: [StudentResolver, StudentsService, PrismaService],
})
export class StudentsModule {}

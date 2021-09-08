import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { NewStudentInput } from "./dto/new-student.input";
import { StudentsArgs } from "./dto/students.args";
import { Student } from "./models/student.model";
import { StudentLoginInput } from "./Dto/student-login.input";
import * as argon2 from "argon2";
@Injectable()
export class StudentsService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async create({
    username,
    password,
    firstname,
    lastname,
    birthYear,
    leftSession,
  }: NewStudentInput): Promise<Student> {
    try {
      const hash = await argon2.hash(password);
      return this.prisma.student.create({
        data: {
          password: hash,
          username,
          firstname,
          lastname,
          birthYear,
          leftSession,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findOneById(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (student.deletedAt == null) {
      return student;
    }
    return null;
  }

  async findAll({ take, skip }: StudentsArgs): Promise<Student[]> {
    return this.prisma.student.findMany({
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
      await this.prisma.student.update({
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
  async login(studentLoginInput: StudentLoginInput): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        username: studentLoginInput.username,
      },
    });

    if (!student) {
      return null;
    }
    try {
      if (argon2.verify(student.password, studentLoginInput.password)) {
        return student;
      }
    } catch {
      return null;
    }
  }
}

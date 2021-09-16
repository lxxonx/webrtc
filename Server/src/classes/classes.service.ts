import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Class } from "./models/class.model";

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async createClass(tutorId: number, schedule: Date): Promise<Class> {
    return this.prisma.class.create({
      data: {
        schedule,
        tutorId,
      },
      include: { tutor: true },
    });
  }

  async updateStudent(studentId: number, tutorId: number, schedule: Date) {
    return this.prisma.class.update({
      where: {
        schedule_tutorId: {
          schedule,
          tutorId,
        },
      },
      data: {
        studentId,
      },
    });
  }
}

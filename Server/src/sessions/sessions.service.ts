import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Session } from "./models/session.model";

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(tutorId: number, schedule: Date): Promise<Session> {
    return this.prisma.session.create({
      data: {
        schedule,
        tutorId,
      },
      include: { tutor: true },
    });
  }

  async updateStudent(studentId: number, tutorId: number, schedule: Date) {
    return this.prisma.session.update({
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

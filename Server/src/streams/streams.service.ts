import { NotFoundException } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Class } from "src/classes/models/class.model";

@Injectable()
export class StreamsService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  // async getUserIdFromClient(client: Socket): Promise<number> {
  //   const token = client.handshake.headers.token as string;

  //   if (!token) {
  //     throw new UnauthorizedException();
  //   }
  //   const userId = await this.authService.verifyToken(token);
  //   if (!userId) {
  //     throw new UnauthorizedException();
  //   }
  //   return userId;
  // }
  // async updateSocketId(client: Socket): Promise<Class> {
  //   const userId = await this.getUserIdFromClient(client);

  //   const session = await this.prisma.class.update({
  //     where: { schedule_tutorId: { tutorId: userId, schedule: new Date() } },
  //     data: {
  //       isCreated: true,
  //     },
  //     include: { tutor: true },
  //   });
  //   return session;
  // }
  async getToId(classId: string): Promise<string> {
    const classVar = await this.prisma.class.findUnique({
      where: { id: classId },
      include: { student: true, tutor: true },
    });
    if (!classVar.isCreated) {
      throw new NotFoundException();
    }

    return classId;
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StreamsService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async updateSocketId(client: Socket) {
    const token = client.handshake.headers.token as string;
    if (!token) {
      throw new UnauthorizedException();
    }
    const userId = await this.authService.verifyToken(token);
    if (!userId) {
      throw new UnauthorizedException();
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: { socketId: client.id },
    });
  }
}

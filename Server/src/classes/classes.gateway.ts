import { UnauthorizedException } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ClassesService } from "./classes.service";

@WebSocketGateway(2000, {
  namespace: "stream",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class ClassesGateway {
  constructor(
    private readonly classesService: ClassesService,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService
  ) {}
  @WebSocketServer()
  server: Server;

  private disconnect(client: Socket) {
    client.emit("Error", new UnauthorizedException());
    client.disconnect();
  }
  @SubscribeMessage("connection")
  handleConnection(@ConnectedSocket() client: Socket) {}

  @SubscribeMessage("join")
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() { classId }
  ) {
    console.log(classId);
    try {
      const tokens: string[] = client.handshake.headers.cookie.split("; ");
      let accessTokenFound = false;
      tokens.forEach(async (t) => {
        const [key, token] = t.split("=");
        if (key == "TOKEN") {
          accessTokenFound = true;
          const decodedToken = await this.authService.findUserByToken(token);
          if (!decodedToken) {
            return this.disconnect(client);
          } else {
            const socketInfo = JSON.stringify(client);
            if (decodedToken.username.startsWith("$t_")) {
              await this.prismaService.class.update({
                where: { id: classId },
                data: {
                  tutorSocket: socketInfo,
                },
              });
            } else {
              await this.prismaService.class.update({
                where: { id: classId },
                data: {
                  studentSocket: socketInfo,
                },
              });
            }
          }
        }
      });
    } catch {
      return this.disconnect(client);
    }
    return this.server.to(classId).emit("welcome", ...client.rooms);
  }

  @SubscribeMessage("answer-call")
  handleAnswerCall(@MessageBody() { to, signal }) {
    return this.server.to(to).emit("callAccepted", signal);
  }
}

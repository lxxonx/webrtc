import { Inject } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { PrismaService } from "./prisma.service";

@WebSocketGateway(80, {
  namespace: "stream",
  cors: { origin: "*", methods: ["GET", "POST"] },
})
export class StreamsGateway {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("connection")
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(client);
    return client.emit("me", client.id);
  }

  @SubscribeMessage("disconnect")
  handleDisconnection(@ConnectedSocket() client: Socket) {
    return client.broadcast.emit("callEnded");
  }

  @SubscribeMessage("callUser")
  handleCallUser(@MessageBody() { userToCall, signalData, from, name }) {
    return this.server.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  }

  @SubscribeMessage("answerCall")
  handleAnswerCall(@MessageBody() data) {
    return this.server.to(data.to).emit("callAccepted", data.signal);
  }
}

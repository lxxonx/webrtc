import { BadRequestException } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { StreamsService } from "./streams.service";

@WebSocketGateway(80, {
  namespace: "stream",
  cors: { origin: "*", methods: ["GET", "POST"] },
})
export class StreamsGateway {
  constructor(private readonly streamService: StreamsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("connection")
  async handleConnection(@ConnectedSocket() client: Socket) {
    return client.emit("me", client.id);
  }

  @SubscribeMessage("disconnect")
  handleDisconnection(@ConnectedSocket() client: Socket) {
    return client.broadcast.emit("callEnded");
  }
  @SubscribeMessage("callUser")
  async handleCallUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() { signalData, from, name, to }
  ) {
    const roomId = await this.streamService.updateSocketId(client);
    if (roomId) {
      return this.server.to(to).emit("callUser", {
        signal: signalData,
        from,
        name,
      });
    } else {
      throw new BadRequestException("room doesn't exist");
    }
  }

  @SubscribeMessage("answerCall")
  handleAnswerCall(@MessageBody() { to, signal }) {
    return this.server.to(to).emit("callAccepted", signal);
  }
}

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

  @SubscribeMessage("join")
  async handleJoin(@MessageBody() { classId }) {
    this.server.socketsJoin(classId);
    return this.server.to(classId).emit("welcome");
  }
  @SubscribeMessage("offer")
  handleOffer(@MessageBody() { offer, classId }) {
    console.log(offer);
    return this.server.to(classId).emit("offer", offer);
  }
  @SubscribeMessage("answer")
  handleAnswer(@MessageBody() { answer, classId }) {
    console.log(answer);
    return this.server.to(classId).emit("answer", answer);
  }
  @SubscribeMessage("ice")
  handleIce(@MessageBody() { ice, classId }) {
    console.log(ice);
    return this.server.to(classId).emit("ice", ice);
  }
  @SubscribeMessage("disconnect")
  handleDisconnection(@ConnectedSocket() client: Socket) {
    return client.broadcast.emit("callEnded");
  }
}

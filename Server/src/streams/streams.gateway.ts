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
  cors: {
    origin: "*", //"http://localhost:3000"
    methods: ["GET", "POST"],
    // credentials: "include",
  },
})
export class StreamsGateway {
  constructor(private readonly streamService: StreamsService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage("connection")
  handleConnection(@ConnectedSocket() client: Socket) {
    return client.emit("me", client.id);
  }

  @SubscribeMessage("callUser")
  handleCallUser(@MessageBody() { userToCall, signalData, from, name }) {
    return this.server
      .to(userToCall)
      .emit("callUser", { signal: signalData, from, name });
  }

  @SubscribeMessage("answerCall")
  handleAnswerCall(@MessageBody() { to, signal }) {
    return this.server.to(to).emit("callAccepted", signal);
  }

  @SubscribeMessage("join")
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() { classId }
  ) {
    client.join(classId);
    const clients = client.client;
    console.log(clients);
    return this.server.to(classId).emit("welcome", ...client.rooms);
  }
  @SubscribeMessage("offer")
  handleOffer(@MessageBody() { offer, classId }) {
    return this.server.to(classId).emit("offer", offer);
  }
  @SubscribeMessage("answer")
  handleAnswer(@MessageBody() { answer, classId }) {
    return this.server.to(classId).emit("answer", answer);
  }
  @SubscribeMessage("ice")
  handleIce(@MessageBody() { ice, classId }) {
    return this.server.to(classId).emit("ice", ice);
  }
  @SubscribeMessage("disconnect")
  handleDisconnection(@ConnectedSocket() client: Socket) {
    return client.broadcast.emit("callEnded");
  }
}

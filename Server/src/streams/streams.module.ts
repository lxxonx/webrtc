import { Module } from "@nestjs/common";
import { StreamsService } from "./streams.service";
import { StreamsGateway } from "./streams.gateway";

@Module({
  providers: [StreamsGateway, StreamsService],
})
export class StreamsModule {}

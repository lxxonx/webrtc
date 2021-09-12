import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { FastifyReply, FastifyRequest } from "fastify";
import { SessionsModule } from "./sessions/sessions.module";
import { PrismaModule } from "./prisma/prisma.module";
import { StreamsModule } from "./streams/streams.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,

      context: ({ request, reply }) => {
        return {
          request: request as FastifyRequest,
          response: reply as FastifyReply,
        };
      },
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    }),
    AuthModule,
    SessionsModule,
    PrismaModule,
    StreamsModule,
  ],
})
export class AppModule {}

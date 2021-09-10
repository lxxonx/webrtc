import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { StreamsGateway } from "./streams.gateway";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      subscriptions: {
        "graphql-ws": true,
      },
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [PrismaService, StreamsGateway],
})
export class AppModule {}
